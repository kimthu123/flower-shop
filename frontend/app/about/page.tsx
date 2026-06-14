import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-sm">
          Our Story
        </h1>
        <p className="mt-3 text-white/90 text-lg">
          The hands behind every bloom
        </p>
      </header>

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12 space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg">
            Every flower at <span className="font-bold text-rose-500">Chu's Flower</span> is
            curated and handmade by skilled artisans, with care put into every stitch and petal.
          </p>

          <p>
            Crochet flowers don&apos;t wilt, don&apos;t need water, and last forever — a little
            piece of craft that brings warmth and colour to any space, any time of year.
          </p>

          <p>
            We believe in slow-made, thoughtful pieces. Each design is chosen for its detail,
            durability, and the joy it brings — whether it&apos;s a gift, home decor, or a
            treat for yourself.
          </p>

          <div className="border-t border-pink-100 pt-6">
            <h2 className="font-bold text-xl text-gray-800 mb-3">How to get yours</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">●</span>
                <span><strong>Order online</strong> — browse our collection and place an order through our shop.</span>
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
            Browse the Collection
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-400 text-sm">
        Made with 🧶 in Melbourne
      </footer>
    </main>
  );
}
