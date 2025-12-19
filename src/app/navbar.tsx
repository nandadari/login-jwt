'use client';

import Link from "next/link";
import { useAuth } from "@/app/login/auth"; // Pastikan path ini benar
import { useState } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tighter text-purple-700">
              STORE<span className="text-slate-900">.</span>CO
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-purple-700">Home</Link>
            <Link href="/dashboard" className="text-sm font-bold text-gray-600 hover:text-purple-700">Dashboard</Link>
            <Link href="/dashboard" className="text-sm font-bold text-gray-600 hover:text-purple-700">About Us</Link>
            <Link href="/dashboard" className="text-sm font-bold text-gray-600 hover:text-purple-700">Contact Us</Link>
            
            {isAuthenticated ? (
              <button 
                onClick={logout} 
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-700 transition-all"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-900 transition-all"
              >
                <LogIn size={16} /> Login
              </Link>
            )}
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pt-2 pb-8 space-y-1 bg-white border-t">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 font-bold text-gray-700">Home</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 font-bold text-gray-700">Dashboard</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 font-bold text-gray-700">About Us</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 font-bold text-gray-700">Contact Us</Link>
          <div className="pt-4">
            {isAuthenticated ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full block text-center bg-purple-700 text-white py-3 rounded-xl font-bold">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}