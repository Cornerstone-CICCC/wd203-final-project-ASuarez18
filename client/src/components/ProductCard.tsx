import { Link } from "react-router";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleSidebar } = useCart();

  /**
   * @function handleAddToCart
   * @desc Handles adding a product to the cart and toggling the sidebar
   * @param {React.MouseEvent} e - The click event
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toggleSidebar();
  };

  return (
    <div className="group bg-white rounded-2xl shadow-xs border border-ash-brown-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-ash-brown-300">
      {/* > Link area to product detail */}
      <Link to={`/items/${product.id}`} className="block overflow-hidden relative">
        <div className="aspect-4/3 w-full bg-ash-brown-100 overflow-hidden relative">
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ash-brown-950/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-ash-brown-950 text-base sm:text-lg group-hover:text-cool-sky-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="font-bold text-ash-brown-900 bg-ash-brown-100 px-2 py-0.5 rounded-md text-sm whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-ash-brown-600 line-clamp-2 leading-relaxed">
            {product.desc}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 px-4 bg-ash-brown-900 cursor-pointer text-ash-brown-50 rounded-xl text-xs sm:text-sm font-semibold hover:bg-cool-sky-600 hover:text-white transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group/btn"
          aria-label={`Add ${product.name} to cart`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform group-hover/btn:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;