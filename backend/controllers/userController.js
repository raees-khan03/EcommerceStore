import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      message: "Login Successfully",
      token,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({
      success: true,
      message: "Signup Successfully",
      token,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email,password },
        process.env.JWT_SECRET
      );

      return res.json({ success: true, token });

    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getUser=async(req,res)=>{
  try {
    const users=await userModel.find();
    if(users){
      res.json({success:true,users})
    }
    else{
      res.json({success:false,meesage:"No Users"})
    }
    
  } catch (error) {
    res.json({success:false,meesage:error.message})
    
  }


}
export { loginUser, registerUser, adminLogin ,getUser};