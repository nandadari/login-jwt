import { getKategori } from "@/lib/kategori";
import Link from "next/link";
import DeleteKategoriButton from "@/components/DeleteKategoriButton";

export default async function DetailKategori(){
const [kategori] = await Promise.all([
    getKategori()
]);
    return(
        <div className="min-h-screen mx-auto px-4 py-8 bg-purple-100">
            <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">Daftar Kategori</h1>
                <div className="overflow-x-auto flex flex-row ">
                    <Link href={'./kategori/add'} className="mr-10 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                                            Tambah Kategori
                </Link>
                <Link href={'/dashboard'} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                                            Kembali
                </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr>
                                <th className="border border-gray-200 bg-gray-50 text-left px-6 py-3 text-sm leading-4 font-medium text-gray-600">Nama Kategori</th>
                                <th className="border border-gray-200 bg-gray-50 text-center px-6 py-3 text-sm leading-4 font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kategori.map((kategori: any) => (
                                <tr key={kategori.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-200 px-6 py-4 text-sm leading-5 font-medium text-gray-900">{kategori.nama}</td>
                                    <td className="border border-gray-200 px-6 py-4 text-sm leading-5 font-medium text-gray-900 text-center">
                                        <Link href={`/dashboard/kategori/${kategori.id}/edit`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                                            Edit
                                        </Link>
                                        <DeleteKategoriButton id={kategori.id} />
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}