import { createContext, useContext, useEffect, useState } from "react";
import type { Product, CartItem, CartContextType } from "../types";

const CART_STORAGE_KEY = "grano_co_cart_v1";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  /**
   * @useEffect
   * @desc Syncs the cart state to localStorage whenever the cart changes
   */
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  /**
   * @function addToCart
   * @desc Adds a product to the cart or updates its quantity if it already exists
   * @param {Product} product - The product to be added to the cart
   * @param {number} quantity - The quantity of the product to be added
   */
  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + quantity,
        };
        return updatedCart;
      }

      return [...prevCart, { product, quantity }];
    });
  };

  /**
   * @function removeFromCart
   * @desc Removes a product from the cart based on its ID
   * @param {number} productId - The ID of the product to be removed from the cart
   */
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  /**
   * @function updateQuantity
   * @desc Updates the quantity of a specific product in the cart
   * @param {number} productId - The ID of the product whose quantity is to be updated
   * @param {number} quantity - The new quantity for the product
   */
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * @function clearCart
   * @desc Clears all items from the cart
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * @function toggleSidebar
   * @desc Toggles the visibility of the sidebar cart
   */
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isSidebarOpen,
        toggleSidebar,
        setIsSidebarOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;