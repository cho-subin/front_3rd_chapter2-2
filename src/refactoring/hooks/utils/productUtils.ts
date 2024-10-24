import { Product } from "../../../types";

export const ProductIdsManage = (
  prev: Set<string>,
  productId: string
): Set<string> => {
  const newSet = new Set(prev);
  newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
  return newSet;
};

export const updateProductInfo = (
  product: Product,
  key: string,
  value: string | number
): Product => {
  return { ...product, [key]: value };
};

export const findProduct = (products: Product[], productId: string) => {
  return products.find((p) => p.id === productId);
};
