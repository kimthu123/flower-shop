'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const { addItem, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  async function handleClick() {
    await addItem(variantId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-semibold text-gray-700">Quantity</span>
        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-2 py-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full text-gray-600 disabled:opacity-40 hover:bg-gray-50"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-rose-400 hover:bg-rose-500 disabled:opacity-60 text-white font-bold py-4 rounded-full text-lg transition-colors"
      >
        {loading ? 'Adding...' : added ? 'Added! ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}
