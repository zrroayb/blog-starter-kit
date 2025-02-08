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
    
    // Form verilerini kontrol et
    const ilce = formData.get('ilce');
    const mahalle = formData.get('mahalle');
    const nufus = formData.get('nufus');
    const yuzolcumu = formData.get('yuzolcumu');
    const photo = formData.get('photo') as File;

    console.log('Form data:', { ilce, mahalle, nufus, yuzolcumu });

    if (!photo) {
      throw new Error('Fotoğraf yüklenmedi');
    }

    if (!ilce || !mahalle || !nufus || !yuzolcumu) {
      throw new Error('Tüm alanları doldurun');
    }

    try {
      // Fotoğrafı base64'e çevir
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${photo.type};base64,${buffer.toString('base64')}`;

      console.log('Uploading to Cloudinary...');
      
      // Cloudinary'ye yükle
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: 'bodrum',
      });

      console.log('Cloudinary response:', uploadResponse);

      // MongoDB'ye kaydet
      const locationData = {
        ilce,
        mahalle,
        nufus: parseInt(nufus as string),
        yuzolcumu,
        photo: uploadResponse.secure_url
      };

      console.log('Saving to MongoDB:', locationData);

      const location = await Location.create(locationData);
      
      console.log('Saved successfully:', location);

      return NextResponse.json({ 
        success: true, 
        data: location 
      });
    } catch (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Yükleme hatası: ${uploadError.message}`);
    }
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Veri kaydedilemedi',
        details: JSON.stringify(error, Object.getOwnPropertyNames(error))
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