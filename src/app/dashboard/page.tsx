import Link from "next/link";
import { getProducts } from "@/lib/products";

export default async function DashboardPage() {
  const [ products] = await Promise.all([
    getProducts()
  ]);
  
  const categories = [...new Set(products.map((p: any) => p.category))];
  const totalValue = products.reduce((sum: number, product: any) => sum + product.price, 0);
  
  return (
    <div className="min-h-screen mx-auto px-4 py-8 bg-purple-100">
      <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-purple-600">Dashboard</h1>
        <p className="text-lg font-medium text-gray-600">Selamat datang di halaman dashboard</p>
        
        {/* Stats Section */}
        <div className="w-full mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-center">
            
            {/* Product Count Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{products.length}</p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Total Produk</h3>
              <p className="text-xs md:text-sm text-gray-500">Jumlah produk tersedia</p>
            </div>
            
            {/* Categories Count Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-green-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-green-600 mb-1">{categories.length}</p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Kategori</h3>
              <p className="text-xs md:text-sm text-gray-500">Jumlah kategori produk</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Daftar Produk</h2>
            <div className="text-sm text-gray-500">
              Menampilkan <span className="font-semibold">{products.length}</span> produk
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
                <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium mb-2">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                    {product.title}
                  </h3>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-bold text-purple-600">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link href={`/dashboard/products/${product.id}/edit`} as={`/dashboard/products/${product.id}/edit`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium">
                        Edit
                      </Link>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}