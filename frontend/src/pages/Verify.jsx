import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { shopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const navigate=useNavigate()
    const{token,setCartData,backendURL}=useContext(shopContext)
    const [seachParams,setSearchParams]=useSearchParams()

    const success=seachParams.get("success")
    const orderId=seachParams.get("orderId")

    const verifyPayment=async()=>{
        try {
            if(!token){
                return null
            }
            const res=await axios.post(backendURL+"/api/order/verify-stripe",{success,orderId},{headers:{token}})
            if(res.data.success){
                setCartData({})
                navigate("/orders")
            }else{
                navigate("/cart")
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }


    }
    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>Verify</div>
  )
}

export default Verify