import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } =
    useCart();
  const navigate = useNavigate();

  const ESTIMATED_TAX = totalPrice * 0.05;
  const GRAND_TOTAL = totalPrice + ESTIMATED_TAX;

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-ash-brown-200 p-8 max-w-lg mx-auto my-8 space-y-4 shadow-xs">
        <span className="text-5xl block">☕</span>
        <h1 className="font-display text-3xl font-bold text-ash-brown-950">
          Your Cart is Empty
        </h1>
        <p className="text-ash-brown-600 text-sm">
          Looks like you haven't added any delicious coffees or treats to your order yet.
        </p>
        <div className="pt-2">
          <Link
            to="/items"
            className="inline-block px-6 py-3 bg-ash-brown-900 text-ash-brown-50 font-bold text-sm rounded-xl hover:bg-ash-brown-800 transition-colors shadow-xs"
          >
            Browse Our Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* > Header */}
      <div className="bg-ash-brown-950 text-ash-brown-50 p-6 sm:p-8 rounded-3xl border border-ash-brown-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-ash-brown-300 text-sm sm:text-base mt-1">
            You have {totalItems} {totalItems === 1 ? "item" : "items"} in your order
          </p>
        </div>

        <button
          onClick={clearCart}
          className="self-start sm:self-auto px-4 py-2 cursor-pointer bg-ash-brown-900 hover:bg-red-900/50 text-red-300 hover:text-red-200 border border-ash-brown-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* > Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-ash-brown-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              {/* > Photo */}
              <Link to={`/items/${product.id}`} className="shrink-0">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-ash-brown-100 hover:opacity-90 transition-opacity"
                />
              </Link>

              {/* > Info */}
              <div className="flex-1 text-center sm:text-left space-y-1 w-full min-w-0">
                <Link
                  to={`/items/${product.id}`}
                  className="font-bold text-ash-brown-950 text-base sm:text-lg hover:text-cool-sky-700 transition-colors block truncate"
                >
                  {product.name}
                </Link>
                <p className="text-xs sm:text-sm text-ash-brown-600 line-clamp-1">
                  {product.desc}
                </p>
                <p className="text-sm font-bold text-ash-brown-800 pt-1">
                  ${product.price.toFixed(2)} each
                </p>
              </div>

              {/* > Quantity Controls */}
              <div className="flex sm:flex-col items-center justify-between gap-4 w-full sm:w-auto border-t sm:border-t-0 border-ash-brown-100 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 bg-ash-brown-50 border border-ash-brown-200 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer bg-white text-ash-brown-900 rounded-lg hover:bg-ash-brown-200 text-xs font-bold transition-colors shadow-xs"
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-ash-brown-950 px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer bg-white text-ash-brown-900 rounded-lg hover:bg-ash-brown-200 text-xs font-bold transition-colors shadow-xs"
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>

                {/* > Subtotal & Delete */}
                <div className="text-right sm:text-center">
                  <p className="font-bold text-ash-brown-950 text-base">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer underline mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* > Order Summary */}
        <div className="bg-white rounded-3xl p-6 border border-ash-brown-200 shadow-xs h-fit space-y-6">
          <h2 className="font-display text-2xl font-bold text-ash-brown-950 border-b border-ash-brown-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-ash-brown-700">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
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
              <span>Total</span>
              <span className="text-cool-sky-700">${GRAND_TOTAL.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-3.5 px-4 cursor-pointer bg-cool-sky-600 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-cool-sky-700 transition-colors shadow-md text-center block"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/items"
              className="w-full py-2.5 px-4 bg-ash-brown-100 text-ash-brown-800 font-bold text-xs sm:text-sm rounded-xl hover:bg-ash-brown-200 transition-colors text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;