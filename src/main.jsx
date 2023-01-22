import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import ThemeProvider from "./store/ThemeProvider";
import ErrorPage from "./ErrorPage";
import Details from "./pages/Details";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: ":/countryId",
    element: <Details />,
    loader: (params) => getCountryById(params.countryId),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);
