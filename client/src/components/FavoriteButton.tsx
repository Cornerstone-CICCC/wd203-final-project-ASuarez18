import type { Product } from "../types";
import { useFavorites } from "../context/FavoritesContext";

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  className = "",
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  /**
   * @function handleClick
   * @desc Handles the click event for the favorite button
   * @param {React.MouseEvent} e - The mouse click event
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all cursor-pointer duration-200 focus:outline-none focus:ring-2 focus:ring-cool-sky-400 ${
        favorite
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white/80 backdrop-blur-xs text-ash-brown-400 hover:text-red-500 hover:bg-white"
      } ${className}`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-transform active:scale-125"
        fill={favorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-1.702-7.382 4.5 4.5 0 00-5.98 1.056L12 7.071l-1.002-1.055a4.5 4.5 0 00-6.68 0z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;