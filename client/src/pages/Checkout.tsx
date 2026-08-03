import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

export const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);

  const ESTIMATED_TAX = totalPrice * 0.05; 
  const GRAND_TOTAL = totalPrice + ESTIMATED_TAX;

  /**
   * @function handleConfirmOrder
   * @desc Handles the order confirmation process
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  const handleConfirmOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    // Order placement processing delay
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setOrderCompleted(true);

      // Redirect to Home
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 1000);
  };

  // > Order Success Screen 
  if (orderCompleted) {
    return (
      <div className="py-16 px-4 text-center bg-white rounded-3xl border border-ash-brown-200 p-8 max-w-lg mx-auto my-8 space-y-4 shadow-md animate-fade-in">
        <span className="text-6xl block animate-bounce">🎉</span>
        <h1 className="font-display text-4xl font-bold text-ash-brown-950">
          Order Confirmed!
        </h1>
        <p className="text-ash-brown-700 font-semibold text-base">
          Thank you for ordering with Grano & Co.
        </p>
        <p className="text-ash-brown-500 text-sm max-w-xs mx-auto">
          Your artisanal coffee and fresh items are being prepared. Redirecting you to the home page...
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-cool-sky-600 text-white font-bold text-sm rounded-xl hover:bg-cool-sky-700 transition-colors shadow-xs"
          >
            Return Home Now
          </Link>
        </div>
      </div>
    );
  }

  // > If Empty Cart 
  if (cart.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-ash-brown-200 p-8 max-w-lg mx-auto my-8 space-y-4 shadow-xs">
        <span className="text-5xl block">🛒</span>
        <h1 className="font-display text-3xl font-bold text-ash-brown-950">
          No Order to Checkout
        </h1>
        <p className="text-ash-brown-600 text-sm">
          Your cart is currently empty. Please add items from our menu before proceeding to checkout.
        </p>
        <div className="pt-2">
          <Link
            to="/items"
            className="inline-block px-6 py-3 bg-ash-brown-900 text-ash-brown-50 font-bold text-sm rounded-xl hover:bg-ash-brown-800 transition-colors shadow-xs"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      {/* > Header */}
      <div className="bg-ash-brown-950 text-ash-brown-50 p-6 sm:p-8 rounded-3xl border border-ash-brown-800 shadow-md">
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Checkout & Final Order Review
        </h1>
        <p className="text-ash-brown-300 text-sm sm:text-base mt-1">
          Review your order summary and confirm your purchase
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* > Order Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-ash-brown-200 shadow-xs space-y-4">
            <h2 className="font-display text-2xl font-bold text-ash-brown-950 border-b border-ash-brown-100 pb-3">
              Items in Your Order
            </h2>

            <div className="divide-y divide-ash-brown-100">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl bg-ash-brown-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-ash-brown-950 text-sm sm:text-base truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-ash-brown-600">
                        Qty: {quantity} × ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-ash-brown-950 text-sm sm:text-base shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* > Final Confirmation */}
        <div className="bg-white rounded-3xl p-6 border border-ash-brown-200 shadow-xs h-fit space-y-6">
          <h2 className="font-display text-2xl font-bold text-ash-brown-950 border-b border-ash-brown-100 pb-3">
            Payment Summary
          </h2>

          <div className="space-y-3 text-sm text-ash-brown-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-ash-brown-950">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
              <span className="font-bold text-ash-brown-950">
                ${ESTIMATED_TAX.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-ash-brown-100 pt-3 flex justify-between text-base font-bold text-ash-brown-950">
              <span>Total Due</span>
              <span className="text-cool-sky-700">${GRAND_TOTAL.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleConfirmOrder} className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 cursor-pointer bg-cool-sky-600 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-cool-sky-700 disabled:bg-cool-sky-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing Order...
                </>
              ) : (
                `Confirm Order • $${GRAND_TOTAL.toFixed(2)}`
              )}
            </button>

            <Link
              to="/cart"
              className="w-full py-2.5 px-4 bg-ash-brown-100 text-ash-brown-800 font-bold text-xs sm:text-sm rounded-xl hover:bg-ash-brown-200 transition-colors text-center block"
            >
              Back to Cart
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;