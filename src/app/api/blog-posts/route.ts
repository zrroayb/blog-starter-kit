import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Blog yazıları alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.content || !data.excerpt || !data.coverImage || !data.author) {
      return NextResponse.json(
        { success: false, error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    const post = await Post.create(data);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Blog post creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Blog yazısı eklenemedi: ' + error.message },
      { status: 500 }
    );
  }
} 