// src/app/dashboard/products/[id]/edit/EditProductForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData();
  
  // Only append the file if a new one was selected
  if (file) {
    formData.append('image', file);
  }
  
  // Append other fields
  formData.append('title', (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value);
  formData.append('price', (e.currentTarget.elements.namedItem('price') as HTMLInputElement).value);
  formData.append('category', (e.currentTarget.elements.namedItem('category') as HTMLSelectElement).value);
  formData.append('description', (e.currentTarget.elements.namedItem('description') as HTMLTextAreaElement).value);

  try {
    const response = await fetch(`http://localhost:3003/products/${product.id}`, {
      method: 'PUT',
      body: formData,
      // Don't set Content-Type header, let the browser set it with the correct boundary
    });

    if (!response.ok) {
      throw new Error('Gagal memperbarui produk');
    }

    const data = await response.json();
    console.log('Produk berhasil diperbarui:', data);
    router.push('/dashboard');
  } catch (error) {
    console.error('Error updating product:', error);
    alert('Gagal menyimpan perubahan. Silakan coba lagi.');
  } finally {
    setIsLoading(false);
  }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Produk</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gambar Produk</label>
              <div className="mt-1 flex items-center">
                <img
                  src={imageUrl ?? product.image ?? '/placeholder-product.png'}
                  alt={product.title}
                  className="h-40 w-40 object-contain rounded-lg border border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-product.png';
                  }}
                />
                <div className="ml-4">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="text-sm text-gray-500"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">Biarkan kosong untuk menggunakan gambar saat ini</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={product.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Harga ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  defaultValue={product.price}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={product.category}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelry</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-2"
            >
              Batal
              </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={isLoading}
            >
              {isLoading ? 'Menyimpan...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}