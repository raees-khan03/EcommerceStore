import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Add from "./pages/Add";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHomePage from "./pages/AdminHomePage";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  
  

  // ✅ token persist karne ke liye
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen">
      <ToastContainer />

      {token === "" ? (
        <Login backendURL={backendURL} setToken={setToken} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout setToken={setToken} />}>
            <Route index  element={<AdminHomePage  token={token}  />} />
            <Route path="add" element={<Add token={token} />} />
            <Route path="list" element={<List token={token} />}  />
            <Route path="orders" element={<Orders  token={token} />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
