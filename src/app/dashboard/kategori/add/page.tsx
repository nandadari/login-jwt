"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddKategori = () => {
  const router = useRouter();
  const [namaKategori, setNamaKategori] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setNamaKategori(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!namaKategori.trim()) {
      newErrors.namaKategori = 'Nama kategori harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        nama: namaKategori,
      };

      const response = await fetch('http://localhost:3002/kategori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Gagal menambahkan kategori');
      }

      router.push('/dashboard/kategori');
      router.refresh();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Tambah Kategori</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Nama Kategori</label>
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="namaKategori"
            name="namaKategori"
            value={namaKategori}
            onChange={handleChange}
          />
          {errors.namaKategori && <p className="text-red-500 text-sm mt-1">{errors.namaKategori}</p>}
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Tambah
        </button>
      </form>
    </div>
  );
};
export default AddKategori;

