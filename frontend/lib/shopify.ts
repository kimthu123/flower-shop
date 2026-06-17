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

export async function createCart(merchandiseId: string, quantity: number = 1) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
      }
    }
  `;
  const { data } = await shopifyClient.request(query, {
    variables: {
      input: {
        lines: [{ merchandiseId, quantity }],
      },
    },
  });
  return data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, merchandiseId: string, quantity: number = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
      }
    }
  `;
  const { data } = await shopifyClient.request(query, {
    variables: {
      cartId,
      lines: [{ merchandiseId, quantity }],
    },
  });
  return data?.cartLinesAdd?.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
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
          }
        }
      }
    }
  `;
  const { data } = await shopifyClient.request(query, {
    variables: { cartId },
  });
  return data?.cart ?? null;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
        }
      }
    }
  `;
  const { data } = await shopifyClient.request(query, {
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });
  return data?.cartLinesUpdate?.cart;
}

export async function removeCartLine(cartId: string, lineId: string) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
        }
      }
    }
  `;
  const { data } = await shopifyClient.request(query, {
    variables: { cartId, lineIds: [lineId] },
  });
  return data?.cartLinesRemove?.cart;
}
