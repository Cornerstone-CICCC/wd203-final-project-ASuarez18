// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { CartProvider } from "./context/CartContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

import { router } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </CartProvider>,
);
