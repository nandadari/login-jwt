// src/app/dashboard/products/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import { getProducts } from "@/lib/products";
import EditProductForm from './EditProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const products = await getProducts();
  const product = products.find(p => p.id.toString() === params.id);

  if (!product) notFound();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}