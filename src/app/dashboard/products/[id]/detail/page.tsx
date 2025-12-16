import Link from "next/link";
import { getProducts } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function DetailProducts({ params }: { params: { id: string } }) {
  const products = await getProducts();
  const product = products.find(p => p.id.toString() === params.id);

  if (!product) notFound();

  return (
    <div className="p-9 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="flex items-center justify-center mb-4"></div>
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Detail Produk</h1>
      <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg px-6 py-4">
        <div className="flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-contain"
            loading="lazy"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{product.category}</p>
        <p className="text-xl font-semibold text-gray-800 mb-6">Rp. {product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <Link 
          href={'/'}
          className="inline-block bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium hover:bg-purple-700"
        >
          kembali
        </Link>
      </div>
    </div>
    </div>
    </div>

  );
}