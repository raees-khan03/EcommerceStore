import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white sticky z-50 border-b">
      {/* Logo with Link */}
      <Link 
        to="/" 
        className="flex items-center hover:opacity-80 transition-opacity duration-300"
      >
        <img
          src={assets.adminLogo}
          alt="Admin Logo"
          className="w-[80px] sm:w-[100px] h-auto object-contain"
        />
      </Link>

      {/* Logout Button */}
      <button
        className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white px-5 py-2 rounded-full text-sm sm:text-base font-medium"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;