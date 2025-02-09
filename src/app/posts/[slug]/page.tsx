import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { Types } from 'mongoose';
import type { Metadata } from 'next';

interface PostType {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: {
    name: string;
    picture: string;
  };
  excerpt: string;
  content: string;
}

async function getPostBySlug(slug: string): Promise<PostType | null> {
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
      coverImage: post.coverImage,
      author: {
        name: post.author,
        picture: '/assets/blog/authors/default.jpg'
      },
      excerpt: post.excerpt,
      content: post.content
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
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
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı | Bodrum',
      description: 'İstenen blog yazısı bulunamadı.',
    };
  }

  return {
    title: `${post.title} | Blog Yazıları | Bodrum`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
