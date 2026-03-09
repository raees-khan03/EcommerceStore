import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartData, product, updateQuantity } = useContext(shopContext);
  const [cartItems, setCartItems] = useState([]);
  
  

  

  useEffect(() => {
    const temp = [];
    for (const productId in cartData) {
      const cartInfo = product.find((item) => item._id === productId);
      for (const size in cartData[productId]) {
        if (cartData[productId][size] > 0) {
          temp.push({
            ...cartInfo,
            size: size,
            quantity: cartData[productId][size],
          });
        }
      }
    }
    setCartItems(temp);
  }, [cartData, product]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 border-t">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-400 tracking-wider uppercase text-sm">
          Your cart is empty
        </div>
      ) : (
        <div className=" divide-y divide-gray-200 ">
          {cartItems.map((item, index) => (
            <div
              key={`${item._id}-${item.size}-${index}`}
              className="flex items-center justify-between gap-6 py-6"
            >
              {/* Product Image */}
              <div className="flex items-center gap-2">
                <div className="w-24 h-24 bg-gray-50 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image?.[0] || item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 max-w-64">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-sm text-gray-700">Rs{item.price}</span>
                    <span className="border border-gray-300 text-xs px-2 py-0.5 text-gray-600 uppercase tracking-wide">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>
              {/* Quantity */}
              <div className="flex items-center ">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity &&
                    updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="w-14 text-center text-sm py-1.5 outline-none bg-transparent"
                />
              </div>

              {/* Delete */}
              <button
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                aria-label="Remove item"
              >
                <img src={assets.bin_icon} alt="" className="w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center justify-end">
        <CartTotal />
      </div>
      <div className="flex justify-end mt-4">
        <Link
          to="/place-order"
          className="bg-black text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-gray-800 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
