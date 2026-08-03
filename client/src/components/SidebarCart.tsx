import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const SidebarCart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useCart();
  const navigate = useNavigate();

  if (!isSidebarOpen) return null;

  const handleCheckoutNavigation = () => {
    setIsSidebarOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-ash-brown-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-ash-brown-50 shadow-2xl flex flex-col justify-between border-l border-ash-brown-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-ash-brown-950 text-ash-brown-50 flex items-center justify-between border-b border-ash-brown-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide">
                Your Order
              </h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-ash-brown-300 hover:text-white hover:bg-ash-brown-850 transition-colors focus:outline-none focus:ring-2 focus:ring-cool-sky-400"
              aria-label="Close cart overview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <span className="text-4xl block">☕</span>
                <p className="text-ash-brown-700 font-semibold text-lg">
                  Your cart is empty
                </p>
                <p className="text-ash-brown-500 text-sm max-w-xs mx-auto">
                  Explore our menu to add your favorite artisanal coffees and fresh bites.
                </p>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="mt-2 inline-block px-4 py-2 bg-ash-brown-800 text-ash-brown-50 text-sm font-semibold rounded-lg hover:bg-ash-brown-900 transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 sm:gap-4 p-3 bg-white rounded-xl shadow-xs border border-ash-brown-200 transition-all hover:border-ash-brown-300"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 bg-ash-brown-100"
                  />

                  {/* Info & Quantity controls */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-ash-brown-900 text-sm sm:text-base truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-ash-brown-600 font-medium">
                      ${product.price.toFixed(2)} each
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-ash-brown-100 text-ash-brown-800 rounded-md hover:bg-ash-brown-200 text-xs font-bold transition-colors"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-ash-brown-900 px-1">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-ash-brown-100 text-ash-brown-800 rounded-md hover:bg-ash-brown-200 text-xs font-bold transition-colors"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex flex-col items-end justify-between h-full py-0.5">
                    <p className="font-bold text-ash-brown-950 text-sm sm:text-base">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-600 hover:text-red-800 text-xs font-semibold underline mt-3 transition-colors"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-ash-brown-200 bg-white space-y-4">
              <div className="flex justify-between items-center text-base sm:text-lg font-bold text-ash-brown-950">
                <span>Subtotal:</span>
                <span className="text-cool-sky-700">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full py-2.5 px-3 border border-ash-brown-700 text-ash-brown-800 rounded-lg text-center text-xs sm:text-sm font-bold hover:bg-ash-brown-100 transition-colors flex items-center justify-center"
                >
                  View Full Cart
                </Link>
                <button
                  onClick={handleCheckoutNavigation}
                  className="w-full py-2.5 px-3 bg-cool-sky-600 text-white rounded-lg text-center text-xs sm:text-sm font-bold hover:bg-cool-sky-700 transition-colors shadow-xs"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          )}

        </div>
      </aside>
    </div>
  );
};

export default SidebarCart;