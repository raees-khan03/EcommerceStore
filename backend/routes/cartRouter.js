import express from "express"
import { addToCart, getUserCart, updateCart } from "../controllers/cartController.js"
import userAuthRouter from "../middleware/userAuth.js"
const cartRouter=express.Router()
cartRouter.post("/add",userAuthRouter,addToCart)
cartRouter.post("/update",userAuthRouter,updateCart)
cartRouter.post("/get",userAuthRouter,getUserCart)

export default cartRouter