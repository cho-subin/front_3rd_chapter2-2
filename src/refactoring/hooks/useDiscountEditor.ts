import { useState } from "react";
import { Discount, Product } from "../../types";
import { findProduct } from "./utils/productUtils";
import {
  determineDiscountValue,
  removeDiscountAtIndex,
} from "./utils/discountUtils";

export const useDiscountEditor = ({
  products,
  onProductUpdate,
  updateEditingProduct,
}: {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  updateEditingProduct: (updatedProduct: Product) => void;
}) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const onDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = determineDiscountValue(e, key);

    setNewDiscount({
      ...newDiscount,
      [key]: value,
    });
  };

  const addDiscount = (productId: string) => {
    const updatedProduct = findProduct(products, productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      updateEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const removeDiscount = (productId: string, index: number) => {
    const updatedProduct = findProduct(products, productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: removeDiscountAtIndex(updatedProduct, index),
      };
      onProductUpdate(newProduct);
      updateEditingProduct(newProduct);
    }
  };

  return {
    newDiscount,
    onDiscountChange,
    addDiscount,
    removeDiscount,
  };
};
