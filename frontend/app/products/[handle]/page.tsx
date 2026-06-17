import { getProductByHandle, getAllProductHandles } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle: string) => ({ handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const images = product.images?.edges?.map((e: any) => e.node) ?? [];
  const variants = product.variants?.edges?.map((e: any) => e.node) ?? [];
  const mainImage = images[0];
  const firstVariant = variants[0];
  const price = firstVariant?.price;
  const hasDescription = product.descriptionHtml && product.descriptionHtml.trim().length > 0;

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href="/" className="text-rose-500 font-semibold hover:underline">
          ← Back to shop
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            {mainImage ? (
              <div className="relative h-96 rounded-3xl overflow-hidden bg-pink-50">
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-96 rounded-3xl bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center text-7xl">
                📦
              </div>
            )}

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1).map((img: any, i: number) => (
                  <div key={i} className="relative h-20 rounded-xl overflow-hidden bg-pink-50">
                    <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="mt-2 text-2xl font-bold text-rose-500">
              {price ? `$${parseFloat(price.amount).toFixed(2)} ${price.currencyCode}` : ''}
            </p>

            <div className="mt-6 border-t border-pink-100 pt-6">
              <h2 className="font-bold text-gray-800 mb-2">Description</h2>
              {hasDescription ? (
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-gray-400 italic">No description available yet.</p>
              )}
            </div>

            {variants.length > 1 && (
              <div className="mt-6 border-t border-pink-100 pt-6">
                <p className="font-bold text-gray-800 mb-2">Options</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v: any) => (
                    <span
                      key={v.id}
                      className="px-4 py-2 rounded-full border border-rose-200 text-sm text-gray-700 bg-white"
                    >
                      {v.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {firstVariant && <AddToCartButton variantId={firstVariant.id} />}
          </div>
        </div>
      </div>
    </main>
  );
}
