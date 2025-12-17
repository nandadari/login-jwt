'use client';

import { deleteKategori } from "@/lib/kategori";
import { useRouter } from "next/navigation";

export default function DeleteKategoriButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        await deleteKategori(id);
        router.refresh(); // Refresh the page to update the list
      } catch (error) {
        console.error('Gagal menghapus kategori:', error);
        alert('Gagal menghapus kategori');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-10 inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
    >
      Hapus
    </button>
  );
}
