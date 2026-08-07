import { Link } from "react-router";

export const NotFound: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 px-4 text-center bg-white rounded-3xl border border-ash-brown-200 p-8 max-w-lg mx-auto my-12 space-y-6 shadow-sm">
      <div className="relative inline-block">
        <span className="text-7xl block select-none">☕</span>
        <span className="absolute -bottom-2 -right-2 bg-ash-brown-950 text-cool-sky-300 font-mono text-xs font-bold px-2 py-0.5 rounded-md border border-ash-brown-800">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ash-brown-950">
          Page Not Found
        </h1>
        <p className="text-ash-brown-600 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
          Oops! The page you are looking for might have been moved, renamed, or
          doesn't exist.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-ash-brown-950 text-ash-brown-50 font-bold text-sm rounded-xl hover:bg-cool-sky-600 hover:text-white transition-all duration-200 shadow-xs flex items-center justify-center gap-2"
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Return to Home
        </Link>
        <Link
          to="/items"
          className="w-full sm:w-auto px-6 py-3 bg-ash-brown-100 text-ash-brown-800 font-bold text-sm rounded-xl hover:bg-ash-brown-200 transition-colors flex items-center justify-center"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
