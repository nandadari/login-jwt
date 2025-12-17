// src/app/dashboard/products/[id]/edit/EditProductForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Definisikan tipe untuk produk
type KategoriType = {
  id: number;
  nama: string;
};

// Helper: Mengubah File menjadi string Base64
const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

export default function EditKategoriForm({ kategori }: { kategori: KategoriType }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk data yang akan dikirim (diinisialisasi dari prop product)
  const [formData, setFormData] = useState({
    nama: kategori.nama,
  });

  // Fungsi untuk update state teks
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      
      // 2. Siapkan Payload JSON untuk PUT request
      const payload = {
        // ID kategori wajib disertakan untuk JSON Server
        id: kategori.id, 
        nama: formData.nama,
      };

      // 3. Kirim permintaan PUT
      const response = await fetch(`http://localhost:3002/kategori/${kategori.id}`, {
        method: 'PUT',
        headers: {
          // WAJIB set Content-Type: application/json untuk JSON Server
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui kategori di server');
      }

      console.log('Kategori berhasil diperbarui:', payload);
      router.push('/dashboard/kategori'); // Arahkan ke daftar kategori
      router.refresh(); // Refresh data Next.js
    } catch (error) {
      console.error('Error updating category:', error);
      alert(`Gagal menyimpan perubahan: ${error instanceof Error ? error.message : 'Silakan coba lagi.'}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit kategori</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Link
              href="/dashboard/kategori"
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
              {isLoading ? 'Menyimpan...' : 'Update Kategori'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}