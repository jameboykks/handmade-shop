import { createContext, useContext, useState, useEffect, useCallback } from "react";
import seedProducts from "../data/seedProducts";

const ProductContext = createContext();

const STORAGE_KEY = "handmade_products";
const SEED_KEY = "handmade_seeded_v2";

function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}

  if (!localStorage.getItem(SEED_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    localStorage.setItem(SEED_KEY, "true");
    return seedProducts;
  }
  return [];
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProduct = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  const getFeatured = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  const getByCategory = useCallback(
    (cat) => (cat ? products.filter((p) => p.category === cat) : products),
    [products]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getFeatured,
        getByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
