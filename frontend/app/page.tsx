import { getProducts } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300 px-6 py-20 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-white/80 font-semibold tracking-wide uppercase text-sm mb-3">
            Wholesale &amp; Retail
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-sm leading-tight">
            The Collective House
          </h1>
          <p className="mt-4 text-white/90 text-lg max-w-md mx-auto">
            Quality goods for every home and business, sourced and stocked with care.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#shop"
              className="bg-white text-rose-500 font-bold px-8 py-3 rounded-full hover:bg-pink-50 transition-colors shadow-sm"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-bold text-gray-800">Wholesale &amp; Retail</h3>
            <p className="text-sm text-gray-500 mt-1">Buy in bulk or pick up just what you need</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold text-gray-800">Quality Checked</h3>
            <p className="text-sm text-gray-500 mt-1">Every product curated for reliability</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-bold text-gray-800">Pickup Available</h3>
            <p className="text-sm text-gray-500 mt-1">Order online, collect in-store in Melbourne</p>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section id="shop" className="px-6 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
          <p className="text-gray-500 mt-2">Browse our full range</p>
        </div>

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
                      📦
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
        The Collective House — Melbourne
      </footer>
    </main>
  );
}
