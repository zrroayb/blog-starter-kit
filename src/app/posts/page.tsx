'use client';

import { useState, useEffect } from 'react';
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from 'next/image';
import Link from 'next/link';
import DateFormatter from '@/app/_components/date-formatter';

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts');
        const result = await response.json();
        if (result.success) {
          setPosts(result.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Yazılar Yükleniyor...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {posts.map((post) => (
          <article key={post._id} className="cursor-pointer group">
            <Link href={`/posts/${post._id}`}>
              <div className="mb-5 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h3>
              <div className="text-lg mb-4">
                <DateFormatter dateString={post.date} />
              </div>
              <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
              <div className="text-sm">
                Yazar: {post.author}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
} 