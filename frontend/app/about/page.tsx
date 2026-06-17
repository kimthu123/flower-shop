import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-sm">
          Our Story
        </h1>
        <p className="mt-3 text-white/90 text-lg">
          Quality goods, sourced with care
        </p>
      </header>

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12 space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg">
            <span className="font-bold text-rose-500">The Collective House</span> brings
            together a curated range of everyday goods — sourced with care, stocked with
            quality in mind, and offered at prices that work whether you&apos;re buying
            for your home or your business.
          </p>

          <p>
            We believe good products shouldn&apos;t be hard to find or expensive to access.
            That&apos;s why we serve both wholesale and retail customers, making it easy
            to get exactly what you need, in the quantity you need it.
          </p>

          <div className="border-t border-pink-100 pt-6">
            <h2 className="font-bold text-xl text-gray-800 mb-3">How to shop with us</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">●</span>
                <span><strong>Order online</strong> — browse our range and place an order through our shop.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">●</span>
                <span><strong>Pickup in-store</strong> — collect your order directly from us in Melbourne.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-rose-400 hover:bg-rose-500 text-white font-bold px-8 py-3 rounded-full transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-400 text-sm">
        The Collective House — Melbourne
      </footer>
    </main>
  );
}
