import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Location from '@/models/Location';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    // MongoDB bağlantısı
    await dbConnect();
    console.log('MongoDB connected');

    const formData = await request.formData();
    console.log('Form data received');
    
    // Fotoğraf işleme
    const photo = formData.get('photo') as File;
    if (!photo) {
      throw new Error('No photo uploaded');
    }

    // Fotoğrafı base64'e çevir
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${photo.type};base64,${buffer.toString('base64')}`;

    // Cloudinary'ye yükle
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: 'bodrum',
    });
    console.log('Photo uploaded to Cloudinary');

    // MongoDB'ye kaydet
    const locationData = {
      ilce: formData.get('ilce'),
      mahalle: formData.get('mahalle'),
      nufus: parseInt(formData.get('nufus') as string),
      yuzolcumu: formData.get('yuzolcumu'),
      photo: uploadResponse.secure_url
    };
    console.log('Saving location data');

    const location = await Location.create(locationData);
    console.log('Location saved');

    return NextResponse.json({ 
      success: true, 
      data: location 
    });
  } catch (error) {
    console.error('Error in POST /api/bodrum-data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Veri kaydedilemedi',
        details: error 
      },
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
      // Cloudinary'den fotoğrafı sil
      const publicId = location.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`bodrum/${publicId}`);
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