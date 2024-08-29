import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../views/Home";
import Login from "../views/Login";

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
        element: <Home />,
      },
      {
        path: "/add-user",
        element: <Home />,
      },
      {
        path: ":id",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }

      return null;
    },
  },
]);

export default router;
