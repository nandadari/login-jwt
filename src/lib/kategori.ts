export async function getKategori() {
  try {
    const res = await fetch('http://localhost:3002/kategori', {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Gagal mengambil data kategori');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function deleteKategori(id: string) {
  try {
    const res = await fetch(`http://localhost:3002/kategori/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      throw new Error('Gagal menghapus kategori');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

// export async function createProduct(formData: FormData) {
//   try {
//     const response = await fetch('http://localhost:3003/products', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Gagal menambahkan produk');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error creating product:', error);
//     throw error;
//   }
// }