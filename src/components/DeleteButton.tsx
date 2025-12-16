"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IProps {
    id: string;
}

export default function DeleteButton({ id }: IProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        // Konfirmasi sebelum menghapus
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus postingan ini?');
        if (!confirmDelete) return;

        setIsDeleting(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:3003/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Gagal menghapus postingan');
            }

            // Refresh halaman untuk memperbarui daftar postingan
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Error deleting post:', err);
            setError('Gagal menghapus postingan. Silakan coba lagi.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isDeleting ? 'Menghapus...' : 'Hapus'}
            </button>
            
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};