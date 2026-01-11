import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";
import Home from "./pages/Home";
import Modules from "./pages/Modules";
// import Gameplay from './pages/Gameplay';

const importGameplay = React.lazy(() => import("./pages/Gameplay"));

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: Modules,
        path: "modules",
      },
      {
        path: "gameplay/:id",
        Component: importGameplay,
      },
    ],
  },
]);

console.log("starting.");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App></App> */}
  </React.StrictMode>
);
