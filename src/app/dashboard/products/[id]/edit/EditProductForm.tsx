// src/app/dashboard/products/[id]/edit/EditProductForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Definisikan tipe untuk produk
type ProductType = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string; // Ini akan berisi string Base64 atau URL
};

// Helper: Mengubah File menjadi string Base64
const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

export default function EditProductForm({ product }: { product: ProductType }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  // State untuk data yang akan dikirim (diinisialisasi dari prop product)
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price.toString(), // Simpan sebagai string di form
    category: product.category,
    description: product.description,
  });

  // State untuk menampilkan gambar (bisa dari Base64 lama, atau URL Blob baru)
  const [imageUrl, setImageUrl] = useState<string>(product.image);

  // Fungsi untuk update state teks (Title, Price, Category, Description)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk update file gambar baru
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Membuat URL object lokal untuk preview gambar baru
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageString = product.image; // Default: Gunakan string gambar lama

      // 1. Cek apakah ada file baru yang dipilih
      if (file) {
        // Konversi file baru menjadi Base64
        finalImageString = await toBase64(file);
      }
      
      // 2. Siapkan Payload JSON untuk PUT request
      const payload = {
        // ID produk wajib disertakan untuk JSON Server
        id: product.id, 
        title: formData.title,
        price: String(formData.price),
        category: formData.category,
        description: formData.description,
        image: finalImageString, // Base64 baru atau lama
      };

      // 3. Kirim permintaan PUT
      const response = await fetch(`http://localhost:3003/products/${product.id}`, {
        method: 'PUT',
        headers: {
          // WAJIB set Content-Type: application/json untuk JSON Server
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui produk di server');
      }

      console.log('Produk berhasil diperbarui:', payload);
      router.push('/dashboard'); // Arahkan ke daftar produk
      router.refresh(); // Refresh data Next.js
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`Gagal menyimpan perubahan: ${error instanceof Error ? error.message : 'Silakan coba lagi.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Pastikan URL object di-revoke saat komponen di-unmount
  useEffect(() => {
    return () => {
      if (file && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [file, imageUrl]);


  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Produk #{product.id}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
            
            {/* Product Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gambar Produk</label>
              <div className="mt-1 flex items-center flex-col md:flex-row">
                <img
                  // Menampilkan Base64 string atau URL Blob baru
                  src={imageUrl}
                  alt={product.title}
                  className="h-40 w-40 object-contain rounded-lg border border-gray-300 bg-gray-50 p-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback jika Base64 string tidak valid atau URL rusak
                    target.src = '/placeholder-product.png'; 
                  }}
                />
                <div className="ml-0 mt-4 md:ml-4 md:mt-0">
                  <input
                    type="file"
                    id="file"
                    name="file" // Ubah nama input menjadi 'file' saja agar konsisten
                    className="text-sm text-gray-500"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Ganti gambar (Maks 2MB Base64)</p>
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
                  value={formData.title} // Menggunakan value dan onChange
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Harga (IDR)
                </label>
                <input
                  type="string"
                  id="price"
                  name="price"
                  step="1" // Ubah step jika menggunakan IDR
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                  disabled={isLoading}
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Link
              href="/dashboard/products"
              className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Batal
            </Link>
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition-all ${
                isLoading 
                  ? 'bg-purple-400 cursor-wait' 
                  : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Menyimpan...' : 'Update Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}