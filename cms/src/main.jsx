import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./components/LoginPage.jsx";
import "toastify-js/src/toastify.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
