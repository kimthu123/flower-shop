import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

export async function getProducts() {
  const query = `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await shopifyClient.request(query);
  return data?.products?.edges?.map((edge: any) => edge.node) ?? [];
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await shopifyClient.request(query, {
    variables: { handle },
  });
  return data?.product ?? null;
}

export async function getAllProductHandles() {
  const query = `
    query getHandles {
      products(first: 50) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  const { data } = await shopifyClient.request(query);
  return data?.products?.edges?.map((edge: any) => edge.node.handle) ?? [];
}
