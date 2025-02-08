import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ success: true, message: 'MongoDB connected successfully' });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { success: false, error: 'Could not connect to MongoDB' },
      { status: 500 }
    );
  }
} 