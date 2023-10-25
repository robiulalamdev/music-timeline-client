import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error/Error.jsx";

import Home from "./components/Home/Home.jsx";
import Timeline from "./components/Timeline/Timeline.jsx";
import CreateTimeline from "./components/CreateTimeline/CreateTimeline.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Register from "./components/Login/Register/Register.jsx";
import MusicTimeline from "./components/MusicTimeline/MusicTimeline.jsx";
import Layout from "./components/Layout/layout.jsx";
import { UserProvider } from "./Provider/UserProvider.jsx";
import PrivateRoute from "./Provider/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/timeline",
        element: <Timeline />,
      },
      {
        path: "/createTimeline",
        element: <CreateTimeline />,
      },
      {
        path: "/musicTimeline",
        element: <MusicTimeline />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          // <Dashboard />
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
