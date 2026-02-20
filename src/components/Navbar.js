'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Crypto', href: '/crypto' },
    { label: 'News', href: '/news' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-gold/30 shadow-[0_4px_30px_rgba(255,215,0,0.08)]">
      <div className="mx-auto sm:px-6 lg:px-8 py-4 flex items-center justify-evenly">
        {/* Logo with sparkle effect */}
        <Link href="/" className="group relative flex items-center gap-3">
          <div className="flex justify-center items-center">
            <img src='logo.png' className='w-12 m-2'/>
            <span className="text-2xl sm:text-3xl md:text-2xl font-black tracking-tighter text-gold group-hover:text-yellow-300 transition-all duration-500">
              ASKOIN
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-lg font-medium transition-all duration-300 group ${
                  isActive ? 'text-gold' : 'text-gray-300 hover:text-gold'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-[-6px] h-[2px] bg-gradient-to-r from-gold to-yellow-300 transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-gold rounded-full animate-pulse-slow" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gold p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile menu - slide down with fade */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 border-t border-gold/30' : 'max-h-0 opacity-0'
        } bg-black/90 backdrop-blur-xl`}
      >
        <div className="flex flex-col items-center py-8 gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-2xl font-medium transition-all duration-300 ${
                  isActive ? 'text-gold scale-110' : 'text-gray-200 hover:text-gold hover:scale-110'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}