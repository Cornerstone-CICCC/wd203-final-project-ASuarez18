import { useState, useEffect } from "react";
import type { Product, ProductsJsonResponse } from "../types";

/**
 * @function useProducts
 * @desc Custom hook to fetch and manage products from products.json
 * @returns {Object} An object containing products, loading state, and error state
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch menu items (HTTP ${response.status})`);
        }

        const data: ProductsJsonResponse = await response.json();

        // Format price to number
        const formattedProducts: Product[] = data.products.map((item) => ({
          ...item,
          price: parseFloat(item.price) || 0,
        }));

        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Error loading products.json:", err);
        setError("Could not load the menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;