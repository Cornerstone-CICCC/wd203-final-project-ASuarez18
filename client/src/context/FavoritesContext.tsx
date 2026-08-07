import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product, FavoritesContextType } from "../types";

const FAVORITES_STORAGE_KEY = "grano_co_favorites_v1";

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  /**
   * @function toggleFavorite
   * @desc Adds or removes a product from the favorites list
   * @param {Product} product - The product to be toggled in the favorites list
   */
  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  /**
   * @function isFavorite
   * @desc Checks if a product is in the favorites list
   * @param {number} productId - The ID of the product to check
   * @returns {boolean} - True if the product is in the favorites list, false otherwise
   */
  const isFavorite = (productId: number): boolean => {
    return favorites.some((item) => item.id === productId);
  };

  /**
   * @function clearFavorites
   * @desc Clears all products from the favorites list
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        totalFavorites: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export default FavoritesContext;