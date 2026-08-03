// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";

// Router
import { router } from "./router/router.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>,
  // </StrictMode>
);
