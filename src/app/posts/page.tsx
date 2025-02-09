import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from 'next/image';
import Link from 'next/link';
import DateFormatter from '@/app/_components/date-formatter';
import { PostPreview } from "@/app/_components/post-preview";
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { Types } from 'mongoose';

// Interface for MongoDB document
interface MongoPost {
  _id: Types.ObjectId;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  content: string;
}

// Interface for transformed post
interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  content: string;
}

async function getPosts(): Promise<PostData[]> {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 }).lean() as MongoPost[];
    
    // Transform MongoDB documents to match the existing Post interface
    return posts.map(post => ({
      slug: post._id.toString(),
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      date: post.date,
      author: post.author,
      content: post.content
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <main>
      <Container>
        <Header />
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Blog Yazıları
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 mb-32">
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

export const metadata = {
  title: 'Blog Yazıları | Bodrum',
  description: 'Bodrum hakkında en güncel blog yazıları ve haberler.',
}; 