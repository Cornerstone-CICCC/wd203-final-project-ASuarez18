import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

export const Items: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (loading) {
    return (
      <div className="py-16 text-center space-y-3">
        <span className="text-4xl animate-bounce inline-block">☕</span>
        <p className="text-ash-brown-700 font-semibold text-lg">
          Loading menu catalog...
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

  /**
   * @function handleSearchChange
   * @desc Updates the search query state and resets the current page to 1
   */
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate slices for pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  /**
   * @function handleSearchChange
   * @desc Updates the search query state and resets the current page to 1
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the search input
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  /**
   * @function handlePageChange
   * @desc Updates the current page state and scrolls to the top of the page
   * @param {number} page - The new page number to set
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner & Search Input */}
      <div className="bg-ash-brown-950 text-ash-brown-50 p-6 sm:p-8 rounded-3xl border border-ash-brown-800 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Our Full Menu
            </h1>
            <p className="text-ash-brown-300 text-sm sm:text-base mt-1">
              {filteredProducts.length > 0
                ? `Showing ${startIndex + 1} - ${Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    filteredProducts.length,
                  )} of ${filteredProducts.length} items`
                : "No matching items found"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search coffee or food..."
              className="w-full pl-10 pr-4 py-2.5 bg-ash-brown-900 border border-ash-brown-700 text-ash-brown-100 placeholder-ash-brown-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cool-sky-400 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-3 text-ash-brown-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid or Empty State */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-ash-brown-200 space-y-3">
          <span className="text-4xl block">🔍</span>
          <h3 className="font-bold text-ash-brown-900 text-lg">
            No items matched "{searchQuery}"
          </h3>
          <p className="text-ash-brown-600 text-sm max-w-sm mx-auto">
            Try checking for spelling errors or searching for another term like
            "Latte" or "Croissant".
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 px-4 py-2 bg-ash-brown-800 text-ash-brown-50 text-sm font-semibold rounded-xl hover:bg-ash-brown-900 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Items;
