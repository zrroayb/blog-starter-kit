import { CMS_NAME } from "@/lib/constants";
import Link from 'next/link';

export function Intro() {
  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
          Bodrum.
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
            Nüfus Verileri
          </Link>
          <Link 
            href="/about" 
            className="hover:underline dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Hakkında
          </Link>
        </nav>
      </section>

      <section className="flex-col flex items-center mb-16 md:mb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 dark:text-slate-200">
            Bodrum'u Keşfedin
          </h2>
          <p className="text-xl leading-relaxed mb-6 dark:text-slate-300">
            Bodrum'un mahallelerini, nüfus verilerini ve en güncel bilgilerini tek bir platformda bulun.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/bodrum-data"
              className="bg-black hover:bg-white hover:text-black border border-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Nüfus Verilerini İncele
            </Link>
            <Link
              href="/posts"
              className="hover:underline font-bold dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Blog Yazılarını Oku →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
