import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-4 md:mb-0">
        <Link href="/" className="hover:underline">
          Bodrum
        </Link>
      </h2>
      <nav className="flex space-x-6 text-lg md:text-xl font-medium">
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
    </div>
  );
};

export default Header;
