// components/Footer.tsx
import Link from "next/link";
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1">
            <h2 className="text-xl font-black text-purple-700 tracking-tighter mb-4">
              STORE.CO
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Menyediakan produk berkualitas tinggi dengan desain minimalis untuk kebutuhan gaya hidup modern Anda.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              Belanja
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-purple-600 transition-colors">Semua Produk</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Produk Baru</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Promo Spesial</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              Perusahaan
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-purple-600 transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Contact Kami</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Product</Link></li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              Follow
            </h3>
            <div className="flex gap-4">
              {/* Sekarang SocialIcon sudah didefinisikan di bawah */}
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Facebook size={20} />} href="#" />
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2025 Store.co. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/" className="hover:underline">Privacy Policy</Link>
            <Link href="/" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Komponen SocialIcon
 * Mendefinisikan komponen ini di dalam file yang sama agar tidak terjadi ReferenceError
 */
function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-100 hover:text-purple-600 transition-all border border-gray-100 shadow-sm active:scale-95"
    >
      {icon}
    </a>
  );
}