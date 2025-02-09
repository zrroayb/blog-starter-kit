'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Container from '@/app/_components/container';
import Header from '@/app/_components/header';
import DateFormatter from '@/app/_components/date-formatter';
import Image from 'next/image';

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog-posts/${params.id}`);
        const result = await response.json();
        if (result.success) {
          setPost(result.data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Container>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Yazı Yükleniyor...</div>
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Yazı bulunamadı.</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <article className="mb-32">
        <div className="relative w-full h-96 mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="mb-6 text-lg">
            <DateFormatter dateString={post.date} />
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </Container>
  );
} 