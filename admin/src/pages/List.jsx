import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Package } from "lucide-react";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendURL + "/api/product/list");
      setList(res.data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;

    try {
      const res = await axios.post(
        backendURL + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message || "Failed to remove product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while removing product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 sm:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Product List</h1>
        </div>
        <p className="text-gray-500 ml-13">{list.length} products in total</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading products...</p>
            </div>
          </div>
        ) : list.length > 0 ? (
          <div className="space-y-3">
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4  bg-pink-500 rounded-lg text-white font-semibold sticky top-6 z-10 shadow-lg">
              <div className="col-span-1">Image</div>
              <div className="col-span-2">Product Name</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-3 text-center">Action</div>
            </div>

            {/* Product Rows */}
            {list.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Mobile Labels + Content */}
                {/* Image */}
                <div className="lg:col-span-1 flex flex-col gap-2">
                  <span className="lg:hidden text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Image
                  </span>
                  <div className="w-full lg:w-20 h-24 lg:h-20 flex-shrink-0 flex items-center justify-center">
                    {item.image && item.image.length > 0 ? (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400 font-medium">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="lg:col-span-2 flex flex-col gap-2">
                  <span className="lg:hidden text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Product Name
                  </span>
                  <p className="text-base font-bold text-gray-900 line-clamp-2">
                    {item.name}
                  </p>
                </div>

                {/* Description */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="lg:hidden text-base font-semibold text-gray-500 uppercase tracking-wide">
                    Description
                  </span>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {item.description || "No description available"}
                  </p>
                </div>

                {/* Price */}
                <div className="lg:col-span-2 flex flex-col gap-2">
                  <span className="lg:hidden text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Price
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-600">
                      ${parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="lg:col-span-3 flex items-end lg:items-center lg:justify-center">
                  <button
                    onClick={() => removeProduct(item._id)}
                    title="Remove product"
                    className="w-full lg:w-auto px-5 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 active:scale-95 transition-all duration-150 font-semibold flex items-center justify-center gap-2 border border-red-200 hover:border-red-300 hover:shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-xl font-semibold text-gray-500 mb-2">No Products Found</p>
            <p className="text-gray-400">Start by adding your first product to the inventory</p>
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme="light"
      />

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default List;