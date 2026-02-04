import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("./pages/login/Login"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
import reactLogo from "./assets/react.svg";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AuthLayout from "./layouts/AuthLayout";
import Guiders from "./pages/guiders/Guiders";
import GuiderDetails from "./pages/guiders/GuiderDetails";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" name="login" element={<Login />} />
          <Route path="/login" name="login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/dashboard" name="dashboard" element={<Dashboard />} />
            <Route path="/guiders" name="guiders" element={<Guiders />} />
            <Route path="/guiders/:id" name="guiders" element={<GuiderDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
