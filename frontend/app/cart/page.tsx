'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, loading, isLoaded, error, updateItem, removeItem } = useCart();
  const lines = cart?.lines?.edges?.map((e: any) => e.node) ?? [];
  const total = cart?.cost?.totalAmount?.amount;
  const currency = cart?.cost?.totalAmount?.currencyCode;

  if (!isLoaded) {
    return (
      <main className="min-h-screen px-6 py-16 text-center">
        <p className="text-gray-400">Loading your cart...</p>
      </main>
    );
  }

  if (!cart || lines.length === 0) {
    return (
      <main className="min-h-screen px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <p className="mt-4 text-gray-500">Your cart is empty.</p>
        {error && <p className="mt-2 text-rose-500 text-sm">{error}</p>}
        <Link href="/" className="mt-8 inline-block bg-rose-400 hover:bg-rose-500 text-white font-bold px-8 py-3 rounded-full transition-colors">
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {error && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {lines.map((line: any) => {
          const product = line.merchandise?.product;
          const image = product?.images?.edges?.[0]?.node;
          const price = line.merchandise?.price;

          return (
            <div key={line.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center">
              {image ? (
                <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                  <Image src={image.url} alt={image.altText ?? ''} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center text-2xl flex-shrink-0">
                  📦
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{product?.title}</h3>
                {line.merchandise?.title !== 'Default Title' && (
                  <p className="text-sm text-gray-500">{line.merchandise?.title}</p>
                )}
                <p className="text-rose-500 font-semibold mt-1">
                  ${price ? parseFloat(price.amount).toFixed(2) : ''}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateItem(line.id, line.quantity - 1)} disabled={loading || line.quantity <= 1} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50">
                  −
                </button>
                <span className="w-8 text-center font-medium">{line.quantity}</span>
                <button onClick={() => updateItem(line.id, line.quantity + 1)} disabled={loading} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                  +
                </button>
              </div>

              <button onClick={() => removeItem(line.id)} disabled={loading} className="text-gray-400 hover:text-rose-500 transition-colors" aria-label="Remove item">
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>${total ? parseFloat(total).toFixed(2) : '0.00'} {currency}</span>
        </div>
        <CheckoutLink url={cart?.checkoutUrl} />
      </div>
    </main>
  );
}

function CheckoutLink({ url }: { url?: string }) {
  return <a href={url} rel="noopener" className="mt-6 block text-center bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-full text-lg transition-colors">Checkout</a>;
}
