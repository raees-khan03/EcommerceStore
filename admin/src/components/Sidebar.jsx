import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]  ">
        <NavLink
          to="/add"
          className={`flex items-center gap-2 border border-gray-400   px-4 py-2 border-r-0`}
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block whitespace-pre-wrap">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center gap-2 border border-gray-400   px-4 py-2 border-r-0"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block whitespace-nowrap">List</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-2 border border-gray-400   px-4 py-2 border-r-0"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block whitespace-nowrap">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
