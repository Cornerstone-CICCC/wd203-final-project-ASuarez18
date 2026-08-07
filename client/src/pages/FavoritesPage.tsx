// src/pages/FavoritesPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

export const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites, totalFavorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFavorites = favorites.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [favorites.length, totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalFavorites === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-ash-brown-200 p-8 max-w-lg mx-auto my-8 space-y-4 shadow-xs">
        <span className="text-5xl block">🤍</span>
        <h1 className="font-display text-3xl font-bold text-ash-brown-950">
          No Favorites Saved Yet
        </h1>
        <p className="text-ash-brown-600 text-sm">
          Tap the heart icon on any coffee or dish to save your favorite items here for quick access.
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
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* > Header */}
      <div className="bg-ash-brown-950 text-ash-brown-50 p-6 sm:p-8 rounded-3xl border border-ash-brown-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Your Saved Favorites
          </h1>
          <p className="text-ash-brown-300 text-sm sm:text-base mt-1">
            Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, favorites.length)} of {totalFavorites} {totalFavorites === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          onClick={clearFavorites}
          className="self-start sm:self-auto px-4 py-2 bg-ash-brown-900 hover:bg-red-900/50 text-red-300 hover:text-red-200 border border-ash-brown-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
        >
          Clear All Favorites
        </button>
      </div>

      {/* > Favorite Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentFavorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FavoritesPage;