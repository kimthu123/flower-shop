import { getProducts } from '@/lib/shopify';
import Image from 'next/image';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">🌸 Hoa Len Handmade</h1>
        <p className="text-sm text-gray-500">Hoa đan tay thủ công - Melbourne</p>
      </header>

      <section className="px-6 py-10">
        <h2 className="text-xl font-medium text-gray-700 mb-6">Sản phẩm</h2>
        {products.length === 0 ? (
          <p className="text-gray-400">Chưa có sản phẩm nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: any) => {
              const image = product.images?.edges?.[0]?.node;
              const price = product.priceRange?.minVariantPrice;
              return (
                <div key={product.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  {image ? (
                    <div className="relative h-56 bg-gray-50">
                      <Image
                        src={image.url}
                        alt={image.altText ?? product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-56 bg-pink-50 flex items-center justify-center text-4xl">🌸</div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                    <p className="mt-3 font-semibold text-pink-600">
                      {price ? `${parseFloat(price.amount).toFixed(2)} ${price.currencyCode}` : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
