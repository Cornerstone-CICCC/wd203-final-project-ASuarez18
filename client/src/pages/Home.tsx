import React from "react";
import { Link } from "react-router";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export const Home: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="py-16 text-center space-y-3">
        <span className="text-4xl animate-bounce inline-block">☕</span>
        <p className="text-ash-brown-700 font-semibold text-lg">
          Brewing your menu experience...
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

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-12 py-4">
      {/* > Hero Section */}
      <section className="bg-ash-brown-950 text-ash-brown-50 rounded-3xl p-6 sm:p-12 border border-ash-brown-800 shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="bg-ash-brown-850 text-cool-sky-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Artisanal Roastery & Kitchen
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ash-brown-50">
            Welcome to Grano & Co.
          </h1>
          <p className="text-ash-brown-300 text-sm sm:text-base leading-relaxed">
            Discover our carefully curated collection of freshly roasted specialty coffee, hand-crafted teas, and global culinary bites.
          </p>
          <div className="pt-2">
            <Link
              to="/items"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cool-sky-600 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-cool-sky-500 transition-colors shadow-md"
            >
              Explore Full Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* > Featured Products */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-ash-brown-200 pb-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-ash-brown-950">
              Featured Selections
            </h2>
            <p className="text-ash-brown-600 text-sm mt-1">
              Popular items crafted fresh every day
            </p>
          </div>
          <Link
            to="/items"
            className="text-sm font-bold text-cool-sky-700 hover:text-cool-sky-900 underline hidden sm:block"
          >
            View All ({products.length})
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;