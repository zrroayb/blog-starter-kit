import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Yazıları | Bodrum',
  description: 'Bodrum hakkında en güncel blog yazıları ve haberler.',
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 