import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = ({ setToken }) => {
  return (
    <div>
      <Navbar setToken={setToken} />
      <div className="flex ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
