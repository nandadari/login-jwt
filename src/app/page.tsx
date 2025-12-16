import { getProducts } from "../lib/products";
import Link from "next/link";
export default async function Home() {

  const [products] = await Promise.all([
    getProducts()
  ]);
  
  return (
    <div className="min-h-screen mx-auto px-4 py-8 bg-purple-100">
      <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
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
                    <Link href={`/dashboard/products/${product.id}/detail`} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium">
                      Lihat Detail
                    </Link>
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
