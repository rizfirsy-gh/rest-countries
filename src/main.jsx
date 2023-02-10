import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Countries from "./routes/Countries";
import "./index.css";
import ThemeProvider from "./store/ThemeProvider";
import ErrorPage from "./ErrorPage";
import Details from "./routes/Details";
import Root from "./routes/root";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Countries />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "countries/:id",
        element: <Details />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);
