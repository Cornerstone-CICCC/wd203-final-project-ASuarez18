import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Items from "../pages/Items";
import ItemDetail from "../pages/ItemDetail";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import { FavoritesPage } from "../pages/FavoritesPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "items", element: <Items /> },
      { path: "items/:id", element: <ItemDetail /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);