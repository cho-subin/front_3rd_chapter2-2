import { useState } from "react";
import { Discount, Product } from "../../types";

export const useProductEditor = ({
  products,
  onProductUpdate,
  onProductAdd,
}: {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const [isShowNewProductForm, setIsShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const showProductForm = () => {
    return setIsShowNewProductForm(!isShowNewProductForm);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setNewProduct({ ...newProduct, [key]: e.target.value });
  };

  const onDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount({
      ...newDiscount,
      rate: parseInt(e.target.value) / 100,
    });
  };

  const productAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const editProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const productNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const priceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const editComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const stockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const addDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
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
      setEditingProduct(newProduct);
    }
  };

  const addNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setIsShowNewProductForm(false);
  };

  return {
    isShowNewProductForm,
    openProductIds,
    newProduct,
    newDiscount,
    editingProduct,
    showProductForm,
    onInputChange,
    onDiscountChange,
    productAccordion,
    editProduct,
    productNameUpdate,
    priceUpdate,
    editComplete,
    stockUpdate,
    addDiscount,
    removeDiscount,
    addNewProduct,
  };
};
