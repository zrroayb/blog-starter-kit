import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import Image from 'next/image';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          width={2000}
          height={1000}
          className="rounded-lg"
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4">
          {title}
        </h1>
        <div className="mb-6 text-lg">
          Yazar: {author.name}
        </div>
      </div>
    </>
  );
}
