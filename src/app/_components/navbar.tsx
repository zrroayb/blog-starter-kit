import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-7">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-800 hover:text-gray-600">
                Ana Sayfa
              </Link>
              <Link href="/nufus-verileri" className="text-gray-800 hover:text-gray-600">
                Nüfus Verileri
              </Link>
              <Link href="/admin" className="text-gray-800 hover:text-gray-600">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 