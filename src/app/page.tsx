import Image from "next/image";
import { Metadata } from "next";
import CategorySection from "@/components/CategorySection";
import { getProducts } from "@/lib/products";
import ContactPage from "@/components/contactUs";
import Link from "next/link";

// SEO Metadata (Pengganti NextSeo yang error sebelumnya)
export const metadata: Metadata = {
  title: "Premium Store | Crafting Quality",
  description: "Temukan koleksi produk terbaik dengan kualitas premium.",
};

export default async function Home() {
  const products = await getProducts();

  // Grouping products by category
  const groupProduct = products.reduce((acc: any, product: any) => {
    const key = product.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});
  
  const categories = Object.keys(groupProduct);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans">
      
      {/* --- HERO / ABOUT SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="relative bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch">
          
          {/* Sisi Kiri: Gambar dengan Frame Modern */}
          <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-50 p-6 md:p-12">
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl group">
              <img 
                src="/hp3.png" 
                alt="Featured Product"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Sisi Kanan: Konten Teks */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <span className="text-purple-600 font-bold tracking-widest uppercase text-xs">The Collection</span>
              <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1]">
                Timeless <br /> <span className="italic text-gray-400">Tradition & Future</span>
              </h1>
            </div>

            {/* Color Swatches - Menambah kesan premium */}
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4D4D4] border border-white shadow-inner" />
              <span className="w-8 h-8 rounded-full bg-[#A8A29E] border border-white shadow-inner" />
              <span className="w-8 h-8 rounded-full bg-[#44403C] border border-white shadow-inner" />
            </div>
            
            <p className="text-gray-500 leading-relaxed text-base max-w-sm">
              Kami percaya bahwa detail kecil membuat perbedaan besar. Setiap produk dikurasi untuk memastikan kenyamanan dan estetika maksimal di ruang Anda.
            </p>

            <Link href={'#'} className="w-fit px-8 py-4 bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
              EXPLORE PRODUCT
            </Link>
          </div>
        </div>

        {/* Akses Dekoratif Background */}
        <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-purple-100 rounded-full blur-[120px] opacity-50" />
      </section>

      {/* --- CATALOG SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Katalog Produk</h2>
            <p className="text-gray-500">Temukan koleksi pilihan berdasarkan kebutuhan Anda.</p>
          </div>

          {/* Navigasi Cepat (Pills Style) */}
          <nav className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <a 
                key={cat} 
                href={`#${cat}`} 
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600 hover:border-black hover:text-black transition-all shadow-sm active:scale-95"
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>

        {/* Rendering Category Sections */}
        <div className="space-y-24">
          {categories.map((category) => (
            <section key={category} id={category} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-gray-200" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">{category}</h3>
                <div className="h-[1px] flex-1 bg-gray-200" />
              </div>
              <CategorySection 
                category={category} 
                products={groupProduct[category]} 
              />
            </section>
          ))}
        </div>
      </main>

      {/* --- FOOTER / CONTACT --- */}
      <footer className="mt-20 bg-white border-t border-gray-100">
        <ContactPage />
      </footer>
    </div>
  );
}