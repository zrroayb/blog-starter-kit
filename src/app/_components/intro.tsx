import { CMS_NAME } from "@/lib/constants";
import Link from 'next/link';

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <nav className="flex space-x-6 text-lg md:text-xl font-medium mt-5 md:mt-0">
        <Link 
          href="/" 
          className="hover:underline dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Ana Sayfa
        </Link>
        <Link 
          href="/bodrum-data" 
          className="hover:underline dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Bodrum Verileri
        </Link>
        <Link 
          href="/about" 
          className="hover:underline dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Hakkında
        </Link>
      </nav>
    </section>
  );
}
