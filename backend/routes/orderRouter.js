import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRozarpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuthRouter from "../middleware/userAuth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/place", userAuthRouter, placeOrder);
orderRouter.post("/stripe", userAuthRouter, placeOrderStripe);
orderRouter.post("/rozarpay", userAuthRouter, placeOrderRozarpay);
orderRouter.post("/userorder", userAuthRouter, userOrders);
orderRouter.post("/verify-stripe", userAuthRouter, verifyStripe);

export default orderRouter;
