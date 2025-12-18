import ProductCard from "./ProductCard";

export default function CategorySection({category, products} : {category: string, products: any[]}){
  return(
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 capitalize px-4 py-1 bg-white border shadow-sm rounded-lg">
          {category}
        </h2>
        <div className="h-[1px] bg-gray-200 flex-grow"></div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{products.length} Items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </section>
  );
}