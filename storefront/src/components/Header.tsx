import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 md:px-12 bg-white">
      <nav className="flex items-center space-x-8">
        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Our water
        </Link>
        <Link href="/features" className="text-gray-700 hover:text-blue-600 font-medium">
          Features
        </Link>
        <Link href="/shop" className="text-gray-700 hover:text-blue-600 font-medium">
          Shop
        </Link>
      </nav>
      
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <h1 className="text-2xl font-serif text-blue-800 font-semibold">Springs</h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
          Log in
        </Link>
        <Link href="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
          Cart
        </Link>
      </div>
    </header>
  );
}
