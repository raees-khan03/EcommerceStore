import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { product, currency,token, backendURL} = useContext(shopContext);
  const[orderData,setOrderData]=useState([])
 
  
 const loadOrderData=async()=>{
  try {
    if(!token){
      return null
    }
    const res=await axios.post(backendURL+"/api/order/userorder",{},{headers:{token}})
    console.log(res);
    
    if(res.data.success){
    let allOrders=[]
      {res.data.orders.map(order=>{
      order.items.map((item)=>{
        item["status"]=order.status
        item["payment"]=order.payment
        item["paymentMethod"]=order.paymentMethod
        item["date"]=order.date
        allOrders.push(item)
       

      })
      
    })}
    setOrderData(allOrders)

    }
    
    
    
  } catch (error) {
    console.log(error);
    
  }
 }
 useEffect(()=>{
  loadOrderData()
 },[token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"}></Title>
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex-col md:flex-row md:justify-between md:items-center gap-4"
          >
            <div className="flex items-start gap-6 text-sm ">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div className="flex flex-col sm:flex-row justify-between w-full py-2">
                <div className="flex flex-col gap-2">
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-4">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size:{item.size}</p>
                  </div>
                  <p>
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p>
                    Payment Method: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button className="border px-4 py-3 text-sm font-medium rounded-md hover:bg-black hover:text-white transition-all duration-300" onClick={loadOrderData}>
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;