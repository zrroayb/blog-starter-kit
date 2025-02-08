import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Location from '@/models/Location';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await dbConnect();
    const locations = await Location.find({});
    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Veriler alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    
    // Fotoğraf işleme
    const photo = formData.get('photo') as File;
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'bodrum');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueFileName = `${Date.now()}-${photo.name}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);
    
    const photoUrl = `/images/bodrum/${uniqueFileName}`;

    // MongoDB'ye kaydet
    const location = await Location.create({
      ilce: formData.get('ilce'),
      mahalle: formData.get('mahalle'),
      nufus: parseInt(formData.get('nufus') as string),
      yuzolcumu: formData.get('yuzolcumu'),
      photo: photoUrl
    });

    return NextResponse.json({ success: true, data: location });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Veri kaydedilemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { id } = await request.json();
    
    const location = await Location.findById(id);
    if (location?.photo) {
      const photoPath = path.join(process.cwd(), 'public', location.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await Location.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Veri silinemedi' },
      { status: 500 }
    );
  }
} 