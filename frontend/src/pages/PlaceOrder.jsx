import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setmethod] = useState("cod");
  const {
    cartData,
    product,
    getTotalAmount,
    delivery_fees,
    backendURL,
    token,setCartData
  } = useContext(shopContext);
  console.log("CartData",cartData);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      paymentMethod: method,
    };

    try {
      let orderItems = [];
      for (const itemId in cartData) {
        for (const size in cartData[itemId]) {
          console.log("size: ",size)
          const productInfo = structuredClone(product.find((item) => item._id === itemId));
          console.log("Product Information",productInfo);
          

          if (productInfo) {
            productInfo.size = size;
            productInfo.quantity = cartData[itemId][size];
            orderItems.push(productInfo);
          }
        }
      }

      let orderData = {
        items: orderItems,
        amount: getTotalAmount() + delivery_fees,
        address: finalData,
      };

      switch (method) {
        case "cod":{
          const res = await axios.post(
            backendURL + "/api/order/place",
            {
              items: orderData.items,
              amount: orderData.amount,
              address: orderData.address,
            },
            { headers: { token } },
          );
        
          
          if(res.data.success){
             setCartData({})
             navigate("/orders");
           toast.success(res.data.message);
          }
          else{
             toast.error(res.data.message);
          }
          break;
        }
       case "stripe":{
  const res = await axios.post(backendURL + "/api/order/stripe", orderData, { headers: { token } })
  if(res.data.success){
    const { session_url } = res.data
    window.location.replace(session_url)
  } else {
    toast.error(res.data.message)
  }
}
          
      }
    } catch (error) {
      console.log(error);
    }

    // yahan backend API call lagani hai
    // 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            {...register("firstName", { required: true })}
            type="text"
            placeholder="First name"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            {...register("lastName", { required: true })}
            type="text"
            placeholder="Last name"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email Address"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />

        <input
          {...register("street", { required: true })}
          type="text"
          placeholder="Street"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            {...register("city", { required: true })}
            type="text"
            placeholder="City"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            {...register("state", { required: true })}
            type="text"
            placeholder="State"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            {...register("zipcode", { required: true })}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            {...register("country", { required: true })}
            type="text"
            placeholder="Country"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          {...register("phone", { required: true })}
          type="number"
          placeholder="Phone"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex flex-col lg:flex-row my-6 gap-3">
            <div
              className="flex items-center gap-3 border p-3 cursor-pointer"
              onClick={() => setmethod("stripe")}
            >
              <p
                className={`w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>

            {/* <div
              className="flex items-center gap-3 border p-3 cursor-pointer"
              onClick={() => setmethod("razorpay")}
            >
              <p
                className={`w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div> */}

            <div
              className="flex items-center gap-3 border p-3 cursor-pointer"
              onClick={() => setmethod("cod")}
            >
              <p
                className={`w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
