'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          <span className="text-rose-500">THE COLLECTIVE</span>
          <span className="text-gray-800"> HOUSE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wide text-gray-600">
          <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
          <Link href="/#shop" className="hover:text-rose-500 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-rose-500 transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-gray-600 hover:text-rose-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
          <Link href="/cart" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-rose-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>CART ($0)</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
