import { Outlet } from "react-router";
import Navbar from "./Navbar";
import SidebarCart from "./SidebarCart";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ash-brown-50 text-ash-brown-900 font-sans selection:bg-cool-sky-200 selection:text-cool-sky-900">
      <Navbar />

      <SidebarCart />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-ash-brown-950 text-ash-brown-200 border-t border-ash-brown-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="font-display text-2xl tracking-wide text-ash-brown-100">
              Grano & Co.
            </span>
          </div>

          <p className="text-sm text-ash-brown-400">
            © {new Date().getFullYear()} Grano & Co. All rights reserved. Built
            for coffee lovers.
          </p>

          <div className="flex items-center gap-6 text-sm text-ash-brown-300">
            <span className="hover:text-cool-sky-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-cool-sky-300 transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
