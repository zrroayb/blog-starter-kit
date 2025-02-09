import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { Types } from 'mongoose';

interface PostData {
  slug: string;
  title: string;
  date: string;
  content: string;
  author: {
    name: string;
    picture: string;
  };
  coverImage: string;
  excerpt: string;
}

async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    await dbConnect();
    const objectId = new Types.ObjectId(slug);
    const post = await Post.findById(objectId).lean();

    if (!post) {
      return null;
    }

    return {
      slug: post._id.toString(),
      title: post.title,
      date: new Date(post.date).toISOString(),
      content: post.content,
      author: {
        name: post.author,
        picture: '/assets/blog/authors/default.jpg'
      },
      coverImage: post.coverImage,
      excerpt: post.excerpt
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

interface PageParams {
  slug: string;
}

export default async function PostPage({
  params,
}: {
  params: PageParams;
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | Bodrum Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
