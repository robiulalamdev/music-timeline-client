import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { isAuthenticated } from "./Auth";
import Login from "../components/Login/Login/Login";
import Layout from "../components/Layout/layout";
import Home from "./../components/Home/Home";

function LoginRoute() {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Routes>
      <Route
        element={
       <Login/>
        }
        path="/"
      />
    </Routes>
  );
}

export default LoginRoute;
