import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import PlacrOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="collection" element={<Collection />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
             <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
        </Route>
            <Route path="place-order" element={<PlacrOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="login" element={<Login />} />
            <Route path="verify" element={<Verify />} />
          </Route>
        </Routes>
         <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
