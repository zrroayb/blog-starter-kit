import Link from 'next/link';
import Image from 'next/image';
import DateFormatter from './date-formatter';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    picture: string;
  };
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          className="w-full h-auto hover:shadow-lg transition-shadow duration-200"
          width={400}
          height={300}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/posts/${slug}`}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="text-lg mb-4">
        By {author.name}
      </div>
    </div>
  );
}
