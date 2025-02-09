import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import DateFormatter from '@/app/_components/date-formatter';
import { Types } from 'mongoose';

interface PostData {
  _id: Types.ObjectId;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  date: Date;
  author: string;
}

type Props = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(slug: string) {
  try {
    await dbConnect();
    const objectId = new Types.ObjectId(slug);
    const post = await Post.findById(objectId).lean() as PostData | null;
    
    if (!post) {
      return null;
    }

    return {
      ...post,
      date: new Date(post.date).toISOString(),
      author: {
        name: post.author,
        picture: '/assets/blog/authors/default.jpg'
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı | Bodrum',
      description: 'İstenen blog yazısı bulunamadı.',
    };
  }

  return {
    title: `${post.title} | Bodrum Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        <article className="max-w-4xl mx-auto py-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="mb-8 text-lg">
            <DateFormatter dateString={post.date} />
            <span className="mx-2">•</span>
            <span>{post.author.name}</span>
          </div>

          {post.coverImage && (
            <div className="mb-8 relative h-64 md:h-96">
              <img
                src={post.coverImage}
                alt={post.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const posts = await Post.find({}).lean();
    return posts.map((post) => ({
      slug: post._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
