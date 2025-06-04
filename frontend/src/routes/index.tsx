import { createBrowserRouter } from "react-router";
import { LayoutHome } from "../pages/home/layout";
import { Explore } from "../pages/home/explore";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <LayoutHome />,
    children: [
      {
        path: '/',
        Component: Explore
      }
    ]
  }
])