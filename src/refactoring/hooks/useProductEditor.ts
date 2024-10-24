import { useState } from "react";
import { Product } from "../../types";
import {
  findProduct,
  ProductIdsManage,
  updateProductInfo,
} from "./utils/productUtils";

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
  const [isShowNewProductForm, setIsShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const showProductForm = () => setIsShowNewProductForm(!isShowNewProductForm);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setNewProduct({ ...newProduct, [key]: e.target.value });
  };

  const productAccordion = (productId: string) => {
    setOpenProductIds((prev) => ProductIdsManage(prev, productId)); // 상태 반환
  };

  const editProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const productNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = updateProductInfo(editingProduct, "name", newName);
      setEditingProduct(updatedProduct);
    }
  };

  const priceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = updateProductInfo(
        editingProduct,
        "price",
        newPrice
      );
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
    const updatedProduct = findProduct(products, productId);
    if (updatedProduct) {
      const newProduct = updateProductInfo(updatedProduct, "stock", newStock);
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

  const updateEditingProduct = (updatedProduct: Product) => {
    setEditingProduct(updatedProduct);
  };

  return {
    isShowNewProductForm,
    openProductIds,
    newProduct,
    editingProduct,
    showProductForm,
    onInputChange,
    productAccordion,
    editProduct,
    productNameUpdate,
    priceUpdate,
    editComplete,
    stockUpdate,
    addNewProduct,
    updateEditingProduct,
  };
};
