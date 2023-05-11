import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
/* existing imports */
import Categories from "./routes/Categories";
import './index.css'
import './App.css'
import Books from "./routes/Books";
import Authors from "./routes/Authors";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Categories />,
    errorElement: <ErrorPage />,
    
  },
  {
    path: "/books",
    element: <Books />,
    errorElement: <ErrorPage />,
    
  },
  {
    path: "/authors",
    element: <Authors />,
    errorElement: <ErrorPage />,
    
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);