import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import { PostPreview } from "@/app/_components/post-preview";

export default function Posts() {
  const posts = getAllPosts();

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