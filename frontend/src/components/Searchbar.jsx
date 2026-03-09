import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";

import { useLocation } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(shopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="border-t border-b  bg-gray-50 text-center">
      <div className="inline-flex items-start justify-center border border-gray-400 rounded-full w-3/4 sm:w-1/2 px-5 py-3 my-5 mx-auto  ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit"
        />
        <img src={assets.search_icon} alt="" className="w-4" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt=""
        className="w-4 inline ml-3 cursor-pointer "
      />
    </div>
  ) : null;
};

export default Searchbar;
