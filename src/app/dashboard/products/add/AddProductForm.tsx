'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getKategori } from '@/lib/kategori';

type FormDataType = {
  title: string;
  price: string;
  category: string;
  description: string;
  'file-upload': File | null;
};

type FormErrors = {
  title?: string;
  price?: string;
  category?: string;
  description?: string;
  'file-upload'?: string;
  form?: string;
};
type KategoriType = {
  id: string | number;
  nama: string;
};

// Helper: Mengubah File menjadi string Base64 agar bisa disimpan di JSON
const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

// --- HELPER BARU UNTUK HARGA ---
const cleanPrice = (value: string): string => {
  // 1. Hapus semua titik/dot (diasumsikan sebagai pemisah ribuan di Indonesia)
  let cleaned = value.replace(/\./g, ''); 
  
  // 2. Ganti koma (jika ada) menjadi titik desimal (agar Number() dapat memprosesnya)
  cleaned = cleaned.replace(/,/g, '.');

  return cleaned;
};

// Fungsi untuk memformat harga dengan titik ribuan saat diketik (Opsional, tapi disarankan untuk UX)
const formatPrice = (value: string): string => {
  const cleaned = cleanPrice(value);
  if (cleaned === '') return '';

  const parts = cleaned.split('.');
  
  // Format bagian integer dengan titik sebagai pemisah ribuan
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  // Gabungkan kembali dengan bagian desimal, gunakan koma sebagai pemisah desimal di tampilan
  if (parts.length > 1) {
    return integerPart + ',' + parts[1];
  }
  
  return integerPart;
};
// --- AKHIR HELPER HARGA ---


export default function AddProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [listKategori, setListKategori] = useState<KategoriType[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    price: '', // Tetap string untuk menampung format titik
    category: '',
    description: '',
    'file-upload': null,
  });


  // Fetch Kategori
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const data = await getKategori();
        setListKategori(data);
      } catch (err) {
        console.error("Gagal mengambil kategori", err);
      }
    };
    fetchKategori();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
        // Hanya izinkan angka, titik, dan koma untuk input price
        const numericAndSeparatorRegex = /^[0-9.,]*$/;
        if (!numericAndSeparatorRegex.test(value)) {
            // Abaikan input jika karakter tidak valid
            return;
        }

        // Simpan nilai terformat ke state untuk tampilan yang rapi
        const formattedValue = formatPrice(value);
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, 'file-upload': file }));
    if (errors['file-upload']) {
      setErrors(prev => ({ ...prev, 'file-upload': '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Nama produk harus diisi';
    
    // 1. Bersihkan harga dari titik sebelum divalidasi
    const rawPriceString = cleanPrice(formData.price);
    const priceNumber = Number(rawPriceString);

    if (!formData.price.trim()) {
      newErrors.price = 'Harga harus diisi';
    } else if (isNaN(priceNumber) || priceNumber <= 0) {
      newErrors.price = 'Harga tidak valid';
    }

    if (!formData.category) newErrors.category = 'Kategori harus dipilih';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi harus diisi';
    if (!formData['file-upload']) {
      newErrors['file-upload'] = 'Gambar produk harus diunggah';
    } else {
      const file = formData['file-upload'];
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        newErrors['file-upload'] = 'Format file harus JPG, PNG, atau GIF';
      } else if (file.size > maxSize) {
        newErrors['file-upload'] = `Ukuran file maksimal ${maxSize / (1024 * 1024)}MB untuk JSON Storage`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let imageBase64 = '';
      if (formData['file-upload']) {
        imageBase64 = await toBase64(formData['file-upload']);
      }
      
      // Dapatkan nilai harga yang sudah dibersihkan dari titik ribuan
      const rawPriceString = cleanPrice(formData.price);

      // Anda dapat memilih untuk mengirimkannya sebagai String atau Number
      // Jika JSON Server menerima number, gunakan Number(rawPriceString)
      const finalPriceValue = Number(rawPriceString);
      
      const payload = {
        title: formData.title,
        price: finalPriceValue, // Mengirim nilai number yang bersih (misal 5000000)
        category: formData.category,
        description: formData.description,
        image: imageBase64,
      };

      const response = await fetch('http://localhost:3003/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.error || 'Gagal menambahkan produk');
        } catch {
            throw new Error(errorText || 'Gagal menambahkan produk');
        }
      }

      router.push('/dashboard');
      router.refresh();
      
    } catch (error) {
      console.error('Submit Error:', error);
      setErrors(prev => ({
        ...prev,
        form: error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan produk',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-center underline font-bold text-gray-800 mb-6">Produk Baru</h1>

        {errors.form && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="Masukkan nama produk"
                  disabled={isLoading}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Harga (IDR) <span className="text-red-500">*</span>
                </label>
                <input
                  // Perubahan PENTING: Ubah type menjadi text
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  // Hapus min="0" karena type bukan number lagi
                  className={`w-full px-4 py-2 border ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="Contoh: 50.000 atau 5.000.000"
                  disabled={isLoading}
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                >
                  <option value="">Pilih kategori</option>
                  {listKategori.map((cat) => (
                    <option key={cat.id} value={cat.nama}>{cat.nama}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Produk <span className="text-red-500">*</span>
                </label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  errors['file-upload'] ? 'border-red-500' : 'border-gray-300'
                } border-dashed rounded-md hover:bg-gray-50 transition-colors`}>
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                      >
                        <span>Unggah file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/jpeg, image/png, image/gif"
                          disabled={isLoading}
                        />
                      </label>
                      <p className="pl-1">atau drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB (Base64)</p>
                    
                    {/* File Name Feedback */}
                    {formData['file-upload'] && (
                      <div className="mt-2 flex items-center justify-center text-sm text-green-600 bg-green-50 py-1 px-2 rounded">
                        <span className="truncate max-w-[200px]">{formData['file-upload'].name}</span>
                      </div>
                    )}
                    
                    {errors['file-upload'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['file-upload']}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Produk <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
              placeholder="Deskripsi lengkap tentang produk Anda..."
              disabled={isLoading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <Link
              href="/dashboard"
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              tabIndex={isLoading ? -1 : 0}
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all ${
                isLoading 
                  ? 'bg-purple-400 cursor-wait' 
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}