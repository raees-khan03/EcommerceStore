import express from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";

import connectDb from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import userRouter from "../routes/userRouter.js";
import productRouter from "../routes/ProductRouter.js";
import cartRouter from "../routes/cartRouter.js";
import orderRouter from "../routes/orderRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDb();
connectCloudinary();

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is working on Vercel!");
});

export const handler = serverless(app);
export default app;