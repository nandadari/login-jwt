import CategorySection from "@/components/CategorySection";
import { getProducts } from "@/lib/products"


export default async function Home(){
  const products = await getProducts();

  //Membuat Grouping 
  const groupProduct = products.reduce((acc: any, product: any) => {
    const key = product.category;
    if (!acc[key]) acc[key] =[];
      acc[key].push(product);
    return acc;
  }, {});
  const categories = Object.keys(groupProduct)

  return(
    <div className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Header / Navigasi Sederhana */}

      <div className="max-w-6xl mx-auto px-6">
        {/* Main Content Card (Mirip Gambar) */}
        <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
          
          {/* Sisi Kiri: Gambar dengan Background Dekoratif */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-full  to-transparent p-8 md:p-12">
            <div className="relative w-full h-full shadow-lg bg-gradient-to-br from-purple-400/50">
              <img 
                src="hp3.png" // Ganti dengan gambar kursi atau produk andalan
                alt="About our craft"
                className="w-full h-full object-cover mx-auto"
              />
            </div>
          </div>

          {/* Sisi Kanan: Konten Teks */}
          <div className="w-full md:w-1/2 p-10 md:p-16 space-y-6">
            {/* Variasi Tekstur/Swatch (Opsional - Seperti di gambar) */}
            <div className="flex gap-3 mb-8">
              <div className="w-12 h-12 bg-gray-100 border border-gray-100"></div>
              <div className="w-12 h-12 bg-purple-300 border border-gray-100"></div>
              <div className="w-12 h-12 bg-yellow-200 border border-gray-100"></div>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
              About Content
            </h2>
            
            <p className="text-2xl font-light text-gray-800 tracking-tight">
              Scroll Time 
            </p>

            <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-md">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
              nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
              Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper 
              suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Aksen Dekoratif Kuning Blur (Opsional) */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-900 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>

  <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Banner / Hero Section */}
      <div className="bg-white border-b mb-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Katalog Produk</h1>
          <p className="text-gray-500 mt-2 text-lg">Temukan koleksi terbaik kami berdasarkan kategori.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Navigasi Cepat (Tabs Style) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <a key={cat} href={`#${cat}`} className="px-4 py-2 bg-white border rounded-full text-sm font-medium hover:border-purple-500 hover:text-purple-600 transition-all capitalize shadow-sm">
              {cat}
            </a>
          ))}
        </div>

        {/* Menampilkan Section Per Kategori */}
        {categories.map((category) => (
          <div key={category} id={category} className="scroll-mt-10">
            <CategorySection 
              category={category} 
              products={groupProduct[category]} 
            />
          </div>
        ))}
      </div>
    </div>
     </div>
     
  )
}