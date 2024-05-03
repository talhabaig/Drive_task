import Layout from "@/components/layout";
import Counter from "@/pages/Counter";
import FolderDetails from "@/pages/FolderDetails";
import { createBrowserRouter as Router } from "react-router-dom";

export const routes = Router([
  {
    path: "*",
    element: <div>Page not found</div>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "folder/:id",
        element: <FolderDetails/>,
      },
    ],
  },
]);
