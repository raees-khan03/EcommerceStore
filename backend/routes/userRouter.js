import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
  getUser
} from "../controllers/userController.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/getUsers", getUser);

export default userRouter;
