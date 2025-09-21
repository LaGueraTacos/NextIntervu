'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="px-4 lg:px-6 py-1 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo/intervu (2).png"
              alt="NextIntervu Logo"
              width={110}
              height={80}
              className="object-contain drop-shadow-lg hover:scale-120 transition-transform duration-200 cursor-pointer"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link 
            href="/#features" 
            className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-semibold text-base hover:shadow-lg hover:shadow-slate-800/20 hover:-translate-y-0.5"
          >
            Features
          </Link>
          <Link 
            href="/#how-it-works" 
            className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-semibold text-base hover:shadow-lg hover:shadow-slate-800/20 hover:-translate-y-0.5"
          >
            How it Works
          </Link>
          <Link 
            href="/pricing" 
            className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-semibold text-base hover:shadow-lg hover:shadow-slate-800/20 hover:-translate-y-0.5"
          >
            Pricing
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center space-x-2">
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 font-semibold text-base"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            <Link 
              href="/#features" 
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-semibold text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-semibold text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="/pricing" 
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-semibold text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <button 
              onClick={() => {
                window.location.href = '/signup';
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 font-semibold text-base"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
