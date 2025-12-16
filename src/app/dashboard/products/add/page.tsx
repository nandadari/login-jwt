import AddProductForm from './AddProductForm';

export const metadata = {
  title: 'Tambah Produk Baru',
  description: 'Tambah produk baru ke dalam sistem',
};

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tambah Produk Baru</h1>
          <p className="mt-2 text-sm text-gray-600">
            Isi formulir di bawah untuk menambahkan produk baru ke dalam sistem.
          </p>
        </div>
        
        <AddProductForm />
      </div>
    </div>
  );
}
