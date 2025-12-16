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

export async function createProduct(formData: FormData) {
  try {
    const response = await fetch('http://localhost:3003/products', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Gagal menambahkan produk');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}