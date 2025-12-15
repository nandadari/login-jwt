export async function getProducts() {
  try {
    const res = await fetch('http://localhost:3003/products', {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Gagal mengambil data produk');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}