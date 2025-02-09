import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Yazısı | Bodrum',
  description: 'Bodrum blog yazısı detayları.',
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 