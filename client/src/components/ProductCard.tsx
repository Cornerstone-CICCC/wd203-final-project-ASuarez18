import { Link } from "react-router";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import FavoriteButton from "./FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleSidebar } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toggleSidebar();
  };

  return (
    <div className="group bg-white rounded-2xl shadow-xs border border-ash-brown-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-ash-brown-300 relative">
      {/* > Link area to product detail */}
      <Link
        to={`/items/${product.id}`}
        className="block overflow-hidden relative"
      >
        <div className="aspect-4/3 w-full bg-ash-brown-100 overflow-hidden relative">
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* > Favorite Btn */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton product={product} />
          </div>
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
          className="w-full py-2.5 px-4 bg-ash-brown-900 text-ash-brown-50 rounded-xl text-xs sm:text-sm font-semibold hover:bg-cool-sky-600 hover:text-white transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group/btn"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
