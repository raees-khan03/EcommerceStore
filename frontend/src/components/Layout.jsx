import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Searchbar from "./Searchbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
