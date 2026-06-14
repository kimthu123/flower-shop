import { getProducts } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-sm">
          🌸 Bloom & Stitch
        </h1>
        <p className="mt-3 text-white/90 text-lg">
          Handmade crochet flowers, made with love in Melbourne
        </p>
      </header>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Our Collection
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-400">No products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const image = product.images?.edges?.[0]?.node;
              const price = product.priceRange?.minVariantPrice;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {image ? (
                    <div className="relative h-64 bg-pink-50">
                      <Image
                        src={image.url}
                        alt={image.altText ?? product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center text-6xl">
                      🌷
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-xl text-rose-500">
                        {price ? `$${parseFloat(price.amount).toFixed(2)}` : ''}
                      </span>
                      <Link
                        href={`/products/${product.handle}`}
                        className="bg-rose-400 hover:bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="text-center py-8 text-gray-400 text-sm">
        Made with 🧶 in Melbourne
      </footer>
    </main>
  );
}
