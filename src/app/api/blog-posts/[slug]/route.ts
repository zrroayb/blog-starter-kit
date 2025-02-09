import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const post = await Post.findById(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Blog yazısı alınamadı: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
      },
      { status: 500 }
    );
  }
} 