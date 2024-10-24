import { Product } from "../../../types";

export const removeDiscountAtIndex = (
  updatedProduct: Product,
  index: number
) => {
  return updatedProduct.discounts.filter((_, i) => i !== index);
};

export const determineDiscountValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: string
) => {
  return key === "quantity"
    ? parseInt(e.target.value)
    : parseInt(e.target.value) / 100;
};
