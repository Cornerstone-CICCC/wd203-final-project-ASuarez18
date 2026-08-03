import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

export const Items: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Calculate slices
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 py-4">
      {/* > Header */}
      <div className="bg-ash-brown-950 text-ash-brown-50 p-6 sm:p-8 rounded-3xl border border-ash-brown-800 shadow-md">
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Our Full Menu
        </h1>
        <p className="text-ash-brown-300 text-sm sm:text-base mt-2">
          Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length} handcrafted items
        </p>
      </div>

      {/* > Product Catalog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
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

export default Items;