// src/app/dashboard/kategori/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import { getKategori } from "@/lib/kategori";
import EditKategoriForm    from './Editkategori';

export default async function EditKategoriPage({ params }: { params: { id: string } }) {
  const kategori = await getKategori();
  const kateg = kategori.find(p => p.id.toString() === params.id) ;

  if (!kateg) notFound();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Kategori</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <EditKategoriForm kategori={kateg} />
      </div>
    </div>
  );
}