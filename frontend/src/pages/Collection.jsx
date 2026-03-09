import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { shopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { product, search } = useContext(shopContext);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [type, setType] = useState("");

  const getCatrogry = (e) => {
    setCategory((prev) => {
      if (prev.includes(e.target.value)) {
        return prev.filter((item) => item !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  };
  const getSubCatrogry = (e) => {
    setSubCategory((prev) => {
      if (prev.includes(e.target.value)) {
        return prev.filter((item) => item !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  };

  useEffect(() => {
    let AllProducts = product.slice();

    // ✅ SEARCH FILTER
    if (search && search.trim() !== "") {
      AllProducts = AllProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // ✅ CATEGORY FILTER
    if (category.length > 0) {
      AllProducts = AllProducts.filter((item) =>
        category.includes(item.category),
      );
    }

    // ✅ SUBCATEGORY FILTER
    if (subCategory.length > 0) {
      AllProducts = AllProducts.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // ✅ SORTING
    if (type === "low-to-high") {
      AllProducts.sort((a, b) => a.price - b.price);
    }

    if (type === "high-to-low") {
      AllProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(AllProducts);
  }, [category, subCategory, product, type, search]); // 👈 search add karo
  return (
    <section className="flex flex-col sm:flex-row gap-6 pt-6 px-4 border-t">
      {/* Sidebar Filters */}
      <div className="w-full sm:w-60 shrink-0 mt-6">
        <h1 className="font-semibold text-2xl tracking-wide mb-3">FILTERS</h1>

        {/* Categories */}
        <div className="border border-gray-200 flex flex-col gap-3 px-4 py-4 mb-4">
          <h2 className="font-medium text-sm tracking-wide text-gray-800">
            CATEGORIES
          </h2>
          {["Men", "Women", "Kids"].map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition-colors duration-150"
            >
              <input
                type="checkbox"
                value={cat}
                onClick={getCatrogry}
                className="w-4 h-4 accent-black cursor-pointer"
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Sub Categories */}
        <div className="border border-gray-200 flex flex-col gap-3 px-4 py-4">
          <h2 className="font-medium text-sm tracking-wide text-gray-800">
            SUB CATEGORIES
          </h2>
          {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
            <label
              key={sub}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition-colors duration-150"
            >
              <input
                type="checkbox"
                value={sub}
                onClick={getSubCatrogry}
                className="w-4 h-4 accent-black cursor-pointer"
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black cursor-pointer bg-white"
            onClick={(e) => setType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-to-high">Sort by: Price - Low to High</option>
            <option value="high-to-low">Sort by: Price - High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
