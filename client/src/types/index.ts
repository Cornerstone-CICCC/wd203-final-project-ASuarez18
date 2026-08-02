/**
 * @type {RawProduct} 
 * @desc Raw product object with properties such as id, name, desc, photo, and price
 */
export interface RawProduct {
  id: number;
  name: string;
  desc: string;
  photo: string;
  price: string;
}

/**
 * @type {ProductsJsonResponse}
 * @desc Response object containing an array of raw product objects (simulating a JSON response from an API)
 */
export interface ProductsJsonResponse {
  products: RawProduct[];
}

/**
 * @type {Product}
 * @desc Product object with property price as number for cart operations
 */
export interface Product {
  id: number;
  name: string;
  desc: string;
  photo: string;
  price: number;
}

/**
 * @type {CartItem}
 * @desc Item in the shopping cart, containing a product and its quantity
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * @type {CartContextType}
 * @desc Context type for managing the shopping cart state and operations
 */
export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}