import { useState } from "react";
import { Discount, Product } from "../../types";

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
    const value =
      key === "quantity"
        ? parseInt(e.target.value)
        : parseInt(e.target.value) / 100;
    setNewDiscount({
      ...newDiscount,
      [key]: value,
    });
  };

  const addDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
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
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
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
