import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { Location } from '@/types/location';

async function getData(): Promise<Location[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/bodrum-data', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const allPosts = getAllPosts();
  const data = await getData();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        <table>
          {data.map((item) => (
            <tr key={item._id}>
              // ... mevcut tablo satırları ...
            </tr>
          ))}
        </table>
      </Container>
    </main>
  );
}
