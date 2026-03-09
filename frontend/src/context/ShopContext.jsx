import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const shopContext = createContext();


const ShopContextProvider = ({ children }) => {
  const backendURL= import.meta.env.VITE_BACKEND_URL;
  const [product, setproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartData, setCartData] = useState({});
  const [token,setToken]=useState("")

  


  const getProductData=async()=>{
    const res= await axios.get(backendURL+"/api/product/list")
    setproducts(res.data.products);
    
  }
  
  useEffect(()=>{
    getProductData()
    
  },[])
  useEffect(()=>{
    if(!token&&localStorage.getItem("token")){
      setToken(localStorage.getItem("token")) 
    }
   
  },[])
  useEffect(() => {
  if (token) {
    getCartData();   // ✅ ab token set hone ke baad chalega
  }
}, [token]);

  const getCartData =async()=>{
    
    
    try {
       const res=await axios.post(backendURL+"/api/cart/get",{},{headers:{token}})
       setCartData(res.data.cartData);
    } catch (error) {
      toast.error(error);
    }
  }


  
  const addtoCart = async (itemId, size) => {
   if (!size) {
      toast.error("Please Select size first");
    }
    
      try {
        const res=await axios.post(backendURL+"/api/cart/add",{itemId,size},{headers:{token}})
        toast.success(res.data.message)
        getCartData()
        
        
      } catch (error) {
            toast.error(error.message)        
      }


    
  };

  const getCartTotal = () => {
    let cartCount = 0;
    const cartItems = structuredClone(cartData);
    for (const ProductId in cartItems) {
      for (const size in cartItems[ProductId]) {
        if (cartItems[ProductId][size] > 0) {
          cartCount = cartCount + cartItems[ProductId][size];
        }
      }
    }
    return cartCount;
  };

  const updateQuantity = async(itemId, size, quantity) => {

    try {
        const res=await axios.post(backendURL+"/api/cart/update",{itemId,size,quantity},{headers:{token}})
        toast.success(res.data.message)
        
        
      } catch (error) {
            toast.error(error.message)        
      }
    const CartItem = structuredClone(cartData);

    if (CartItem[itemId] && CartItem[itemId][size]) {
      CartItem[itemId][size] = quantity;
    }

    setCartData(CartItem);
  };
  const getTotalAmount = () => {
    let total = 0;

    for (const productId in cartData) {
      const productInfo = product.find((item) => item._id === productId);

      if (!productInfo) continue;

      for (const size in cartData[productId]) {
        const quantity = cartData[productId][size];
        total += productInfo.price * quantity;
      }
    }

    return total;
  };
 
  const delivery_fees = 10;
  const currency = "$";
  const value = {
    product,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addtoCart,
    getCartTotal,
    cartData,
    updateQuantity,
    delivery_fees,
    getTotalAmount,
    currency,
    backendURL,
    setToken,token,
    getCartData,
    setCartData
  };
  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopContextProvider;
