import React, { useState } from "react";
import { useParams, Link } from "react-router";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const { addToCart, toggleSidebar } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <span className="text-4xl animate-bounce inline-block">☕</span>
        <p className="text-ash-brown-700 font-semibold text-lg">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-700 bg-red-50 rounded-2xl border border-red-200 max-w-lg mx-auto my-8">
        <p className="font-bold text-lg">Error</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  const productId = Number(id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-ash-brown-200 p-8 max-w-lg mx-auto my-8 space-y-4 shadow-xs">
        <span className="text-5xl block">🔍</span>
        <h2 className="font-display text-3xl font-bold text-ash-brown-950">
          Item Not Found
        </h2>
        <p className="text-ash-brown-600 text-sm">
          We couldn't find the menu item you're looking for. It might have been removed or the link is incorrect.
        </p>
        <div className="pt-2">
          <Link
            to="/items"
            className="inline-block px-6 py-3 bg-ash-brown-900 text-ash-brown-50 font-bold text-sm rounded-xl hover:bg-ash-brown-800 transition-colors shadow-xs"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  /**
   * @function handleDecreaseQuantity
   * @desc Decreases the quantity by 1
   */
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  /**
   * @function handleIncreaseQuantity
   * @desc Increases the quantity by 1
   */
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  /**
   * @function handleAddToCart
   * @desc Adds the product to the cart and opens the sidebar
   */
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toggleSidebar();
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* > Back link */}
      <nav>
        <Link
          to="/items"
          className="inline-flex items-center gap-2 text-sm font-bold text-ash-brown-700 hover:text-cool-sky-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Menu
        </Link>
      </nav>

      {/* > Main Detail Card */}
      <div className="bg-white rounded-3xl border border-ash-brown-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
        {/* Product Image */}
        <div className="aspect-4/3 md:aspect-auto w-full bg-ash-brown-100 relative overflow-hidden">
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* > Product Information */}
        <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4 border-b border-ash-brown-100 pb-4">
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-ash-brown-950 tracking-tight">
                {product.name}
              </h1>
              <span className="font-bold text-2xl text-cool-sky-700 bg-ash-brown-50 px-3 py-1 rounded-xl border border-ash-brown-200">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-ash-brown-700 text-sm sm:text-base leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* > Order Actions */}
          <div className="space-y-6 pt-4 border-t border-ash-brown-100">
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-sm text-ash-brown-900 uppercase tracking-wider">
                Quantity
              </span>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 bg-ash-brown-50 border border-ash-brown-200 rounded-xl p-1">
                <button
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer bg-white text-ash-brown-900 rounded-lg hover:bg-ash-brown-200 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-colors shadow-xs"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-bold text-ash-brown-950 text-base w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer bg-white text-ash-brown-900 rounded-lg hover:bg-ash-brown-200 font-bold transition-colors shadow-xs"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal & Submit Button */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-ash-brown-600">
                <span>Item Subtotal:</span>
                <span className="font-bold text-ash-brown-950 text-base">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 cursor-pointer bg-cool-sky-600 text-white cursor-pointer font-bold text-sm sm:text-base rounded-xl hover:bg-cool-sky-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add {quantity} to Order • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;