import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleSidebar } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  /**
   * @function getNavLinkClass
   * @desc Returns the class names for link based on its active state
   * @param {Object} isActive - checks if the link is active
   * @returns {string} Class names for the link
   */
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? "bg-ash-brown-800 text-cool-sky-300 shadow-xs"
        : "text-ash-brown-200 hover:bg-ash-brown-850 hover:text-white"
    }`;

  return (
    <header className="bg-ash-brown-950 text-ash-brown-100 shadow-md sticky top-0 z-40 border-b border-ash-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* > Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
          >
            <span className="text-2xl" role="img" aria-label="coffee cup">
              ☕
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-ash-brown-50 group-hover:text-cool-sky-300 transition-colors">
              Grano & Co.
            </span>
          </Link>

          {/* > Links and Sidebar Buttons */}
          <div className="flex items-center gap-4">
            {/* > Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={getNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/items" className={getNavLinkClass}>
                Menu
              </NavLink>
              <NavLink to="/cart" className={getNavLinkClass}>
                Cart
              </NavLink>
            </nav>

            <div className="flex items-center gap-2">
              {/* > Sidebar Button */}
              <button
                onClick={toggleSidebar}
                className="relative p-2 rounded-lg bg-ash-brown-900 border border-ash-brown-700 text-ash-brown-100 hover:bg-ash-brown-800 hover:text-cool-sky-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cool-sky-400"
                aria-label="Open cart overview"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>

                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-cool-sky-500 text-ash-brown-950 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* > Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-lg bg-ash-brown-900 border border-ash-brown-700 text-ash-brown-200 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* > Mobile Nav links */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-ash-brown-800 space-y-1">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={getNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/items"
              onClick={closeMobileMenu}
              className={getNavLinkClass}
            >
              Menu
            </NavLink>
            <NavLink
              to="/cart"
              onClick={closeMobileMenu}
              className={getNavLinkClass}
            >
              Cart
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
