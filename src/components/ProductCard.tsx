import Link from "next/link";

export default function ProductCard({product} : {product: any}){
    return(
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md trasition-all duration-300 border border-purple-700 flex flex-col h-full group">
            <div className="h-48 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                <img src={product.image} alt={product.title} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-15 group-hover:text-purple-600 transition-colors">
                    {product.title}
                </h3>
                <div className="mt-auto">
                    <p className="text-lg font-bold text-purple-600 mb-3">RP. {product.price}</p>
                    <Link href={`/dashboard/products/${product.id}/detail`}
                    className="block text-center w-full bg-purple-800 hover:bg-purple-900 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}