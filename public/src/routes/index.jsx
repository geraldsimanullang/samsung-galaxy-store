import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home"
import Detail from "../views/Detail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:id",
    element: <Detail />
  }
]);

export default router
