import React, { useContext, useState } from "react";
import Logo from "../assets/logo-1.png";
import search_icon from "../assets/search_icon.png";
import profile_icon from "../assets/profile_icon.png";
import cart_icon from "../assets/cart_icon.png";
import menu_icon from "../assets/menu_icon.png";
import dropdown_icon from "../assets/dropdown_icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setShowSearch, getCartTotal, setToken ,token} = useContext(shopContext);
  const navigate=useNavigate()
  const logOut = () => {
    setToken("");
    localStorage.clear();
    navigate("/login")
    
  };

  return (
    <nav className="flex items-center justify-between py-5 px-4 font-medium relative">
      {/* Logo */}
      <Link to="/">
        <img src={Logo} className="w-24 cursor-pointer" alt="logo" />
      </Link>
      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
        {["Home", "Collection", "About", "Contact"].map((item) => (
          <li key={item} className="relative group">
            <NavLink
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `transition-colors duration-200 hover:text-black ${
                  isActive ? "text-black" : "text-gray-600"
                }`
              }
            >
              {item.toUpperCase()}
            </NavLink>
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <img
          src={search_icon}
          className="w-5 cursor-pointer transition-transform duration-200 hover:scale-110"
          alt="search"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
        >
          <Link to="/login">
          <img
            src={profile_icon}
            className="w-5 cursor-pointer transition-transform duration-200 hover:scale-110"
            alt="profile"
          />
          </Link>

          {/* Dropdown */}
          <div
            className={`absolute right-0 top-full pt-3 z-50 transition-all duration-200 origin-top ${
              profileOpen
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
            }`}
          >
            {token && (
              <div className="flex flex-col gap-1 w-36 py-3 px-5 bg-slate-100 rounded shadow-md text-sm text-gray-600">
                <p className="cursor-pointer py-1 transition-colors duration-150 hover:text-black">
                  My Profile
                </p>
                <p className="cursor-pointer py-1 transition-colors duration-150 hover:text-black" onClick={()=>navigate("/orders")}>
                  Orders
                </p>
                <p
                  onClick={logOut}
                  className="cursor-pointer py-1 transition-colors duration-150 hover:text-black"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer group">
          <Link to="/cart">
            <img
              src={cart_icon}
              className="w-5 transition-transform duration-200 hover:scale-110"
              alt="cart"
            />
          </Link>
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white rounded-full text-[10px] flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            {getCartTotal()}
          </span>
        </div>

        {/* Hamburger (mobile) */}
        <img
          src={menu_icon}
          className="w-5 cursor-pointer sm:hidden transition-transform duration-200 hover:scale-110"
          onClick={() => setToggle(true)}
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          toggle ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            toggle ? "opacity-30" : "opacity-0"
          }`}
          onClick={() => setToggle(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
            toggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Back Button */}
          <div
            className="flex items-center gap-3 px-5 py-5 cursor-pointer text-gray-600 hover:text-black transition-colors duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            <img src={dropdown_icon} className="h-4 rotate-180" alt="back" />
            <span className="text-sm font-medium">Back</span>
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col px-5 pt-4 gap-1 text-sm text-gray-700">
            {["Home", "Collection", "About", "Contact"].map((item, i) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setToggle(false)}
                  className={({ isActive }) =>
                    `block py-3 border-b border-gray-100 transition-colors duration-150 hover:text-black hover:pl-1 hover:bg-gray-100 ${
                      isActive ? "text-black font-semibold" : "text-gray-600"
                    }`
                  }
                  style={{
                    transitionDelay: toggle ? `${i * 40}ms` : "0ms",
                  }}
                >
                  {item.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
