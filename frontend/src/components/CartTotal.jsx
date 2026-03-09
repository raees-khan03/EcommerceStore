import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";

const CartTotal = () => {
  const { delivery_fees, getTotalAmount } = useContext(shopContext);

  const subtotal = getTotalAmount() || 0;

  const deliveryFee = subtotal > 0 ? delivery_fees : 0;

  const total = subtotal + deliveryFee;

  return (
    <div className="w-1/2 font-sans my-10 border-t">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-200">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-4 text-sm text-gray-600">
          <span>Subtotal</span>
          <span>Rs{subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center py-4 text-sm text-gray-600">
          <span>Shipping Fee</span>
          <span>Rs{delivery_fees.toFixed(2)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 text-sm">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-medium text-gray-900">Rs{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
    </div>
  );
};

export default CartTotal;
