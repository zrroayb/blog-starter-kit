import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
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

async function getPost(slug: string) {
  try {
    await dbConnect();
    // Convert slug (which is the _id) to MongoDB ObjectId
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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Alert preview={post.preview} />
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

export const metadata = {
  title: 'Blog Yazısı | Bodrum',
  description: 'Bodrum blog yazısı detayları.',
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
