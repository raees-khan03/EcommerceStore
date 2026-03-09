import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL } from "../App";
import { ChevronDown, MapPin, Package, CreditCard, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

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
    getAllOrders();
  }, []);

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
        return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" };
      case "packing":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" };
      case "shipped":
        return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" };
      case "out for delivery":
        return { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", dot: "bg-indigo-500" };
      case "delivered":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" };
      case "cancelled":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-500" };
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle2 className="w-5 h-5" />;
      case "shipped":
      case "out for delivery":
        return <Truck className="w-5 h-5" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const res = await axios.post(
        backendURL + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    } finally {
      setLoading(false);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6 inline-block p-4 bg-slate-100 rounded-full">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            No Orders Yet
          </h2>
          <p className="text-slate-500 text-lg">Orders will appear here once you place them</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Your Orders
              </h1>
              <p className="text-slate-500 mt-1">
                {orders.length} order{orders.length !== 1 ? "s" : ""} • Track and manage your purchases
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid of Order Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {orders.map((order, index) => {
            const colors = getStatusColor(order.status);
            const isExpanded = expandedOrder === order._id;

            return (
              <div
                key={order._id || index}
                className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-slate-300"
              >
                {/* Order Card Header */}
                <button
                  onClick={() =>
                    setExpandedOrder(isExpanded ? null : order._id)
                  }
                  className="w-full p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Order ID
                      </p>
                      <p className="font-mono text-sm font-bold text-slate-900">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors.bg} ${colors.text} ${colors.border} whitespace-nowrap`}>
                      <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                      <span className="text-sm font-semibold">{order.status}</span>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Date</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Total</p>
                      <p className="text-sm font-bold text-slate-900">
                        PKR {order.amount}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Items</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {order.items?.length || 0}
                      </p>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      {isExpanded ? "Hide details" : "View details"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50">
                    {/* Items Section */}
                    <div className="p-5 sm:p-6 border-b border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <Package className="w-4 h-4 text-slate-600" />
                        Items ({order.items?.length || 0})
                      </h3>
                      <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-4 flex gap-3"
                          >
                            <img
                              src={item.image?.[0]}
                              alt={item.name}
                              className="w-14 h-14 rounded-lg object-cover bg-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 text-sm truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500 mb-2">
                                {item.subCategory}
                              </p>
                              <div className="flex gap-3 text-xs">
                                <span className="text-slate-600">
                                  Size: <span className="font-semibold text-slate-900">{item.size}</span>
                                </span>
                                <span className="text-slate-600">
                                  Qty: <span className="font-semibold text-slate-900">{item.quantity}</span>
                                </span>
                                <span className="font-semibold text-slate-900">
                                  PKR {item.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address Section */}
                    <div className="p-5 sm:p-6 border-b border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        Shipping Address
                      </h3>
                      <div className="bg-white rounded-lg p-4 text-sm space-y-2">
                        <p className="font-semibold text-slate-900">
                          {order.address?.firstName} {order.address?.lastName}
                        </p>
                        <p className="text-slate-600">{order.address?.street}</p>
                        <p className="text-slate-600">
                          {order.address?.city}, {order.address?.state} {order.address?.zipcode}
                        </p>
                        <p className="text-slate-600">{order.address?.country}</p>
                        <div className="border-t border-slate-200 pt-3 mt-3 space-y-1">
                          <p className="text-slate-600">
                            <span className="font-semibold text-slate-900">Phone:</span> {order.address?.phone}
                          </p>
                          <p className="text-slate-600">
                            <span className="font-semibold text-slate-900">Email:</span> {order.address?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <CreditCard className="w-4 h-4 text-slate-600" />
                        Payment
                      </h3>
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Method:</span>
                          <span className="font-semibold text-slate-900">
                            {order.paymentMethod?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Status:</span>
                          <span
                            className={`font-semibold ${
                              order.payment
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {order.payment ? "✓ Paid" : "⏱ Pending"}
                          </span>
                        </div>
                        <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between">
                          <span className="font-bold text-slate-900">Total:</span>
                          <span className="font-bold text-slate-900 text-lg">
                            PKR {order.amount}
                          </span>
                        </div>
                      </div>

                      {/* Status Update Dropdown */}
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <label className="block text-sm font-bold text-slate-900 mb-2">
                          Update Status
                        </label>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          disabled={loading}
                          className={`w-full px-4 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition-all ${
                            getStatusColor(order.status).bg
                          } ${getStatusColor(order.status).border} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {orders.length}
              </p>
              <p className="text-sm text-slate-600">Total Orders</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <p className="text-3xl font-bold text-green-600 mb-1">
                {orders.filter(o => o.status?.toLowerCase() === "delivered").length}
              </p>
              <p className="text-sm text-slate-600">Delivered</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <p className="text-3xl font-bold text-amber-600 mb-1">
                {orders.filter(o => !["delivered", "cancelled"].includes(o.status?.toLowerCase())).length}
              </p>
              <p className="text-sm text-slate-600">In Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;