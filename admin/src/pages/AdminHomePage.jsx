import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL } from "../App";
import {
  ShoppingCart,
  Users,
  Package,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminHomePage = ({token}) => {
   const [orders, setOrders] = useState([]);
   const [users, setUsers] = useState([]);
   console.log(orders);
   
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeUsers: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        backendURL + "/api/user/getUsers",
        {},
        
      );
      console.log("Response is",res);
      
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { token } }
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllOrders ();
    getAllUsers();
  }, [token]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "order placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "packing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "out for delivery":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-pink-500 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                Admin Panel
              </span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl">
              Manage your forever business with elegance and ease. Your dashboard
              awaits.
            </p>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-pink-500 via-pink-500 to-transparent w-20 mb-12"></div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Stat Card 1 - Total Orders */}
            <div className="group bg-white rounded-2xl p-8 border border-pink-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Total Orders
                  </p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                    {loading ? "..." : orders.length}
                  </p>
                </div>
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-8 h-8 text-pink-500" />
                </div>
              </div>
              <p className="text-pink-500 text-sm font-medium">
                From your Forever Store
              </p>
            </div>

            {/* Stat Card 2 - Active Users */}
            <div className="group bg-white rounded-2xl p-8 border border-pink-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Active Users
                  </p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                    {loading ? "..." : users.length}
                  </p>
                </div>
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-pink-500" />
                </div>
              </div>
              <p className="text-pink-500 text-sm font-medium">
                Engaged customers
              </p>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        {!loading && stats.recentOrders.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Orders</span>
              </h2>
              <a
                href="#orders"
                className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-pink-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <p className="font-mono text-sm font-bold text-gray-900">
                          #{order._id?.slice(-8).toUpperCase()}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {order.address?.firstName} {order.address?.lastName} •{" "}
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">
                        PKR {order.amount}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.items?.length || 0} items
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Essential <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border border-pink-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Manage Items
              </h3>
              <p className="text-gray-600 font-light">
                Add, edit, and organize your product catalog with ease. Keep
                everything in perfect order.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border border-pink-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Track Orders
              </h3>
              <p className="text-gray-600 font-light">
                Monitor all orders in real-time and keep your customers
                informed every step of the way.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border border-pink-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Manage Users
              </h3>
              <p className="text-gray-600 font-light">
                View user profiles, manage customer information, and engage with
                your community.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border border-pink-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 mb-6 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                More Features
              </h3>
              <p className="text-gray-600 font-light">
                Explore advanced analytics, reports, and customization options
                for your business.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Dive into your admin dashboard and start managing your business like
            never before.
          </p>
          <Link to={"/add"}>
          <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:shadow-lg hover:scale-105">
            <ArrowRight className="inline-block mr-3 w-5 h-5" /> Enter Dashboard
          </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-pink-100 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
          <p>
            &copy; 2026 Forever Admin Panel. All rights reserved. | Designed
            with <span className="text-pink-500">❤</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminHomePage;