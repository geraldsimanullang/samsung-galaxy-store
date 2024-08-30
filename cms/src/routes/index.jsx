import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../views/Login";
import Home from "../views/Home";
import Categories from "../views/Categories"
import AddProduct from "../views/AddProduct"
import EditProduct from "../views/AddProduct"
const serverUrl = "https://server.geraldsimanullang.site"

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <Home serverUrl={serverUrl}/>,
      },
      {
        path: "/categories",
        element: <Categories serverUrl={serverUrl}/>,
      },
      {
        path: "/add-product",
        element: <AddProduct serverUrl={serverUrl}/>,
      },
      {
        path: "/add-user",
        element: <Home serverUrl={serverUrl}/>,
      },
      {
        path: "/edit/:id",
        element: <EditProduct serverUrl={serverUrl}/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login serverUrl={serverUrl}/>,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }

      return null;
    },
  },
]);

export default router;
