import jwt from "jsonwebtoken";
const  userAuthRouter = async (req, res, next) => {
  const { token } = req.headers;
//   console.log("Token",token);
  

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
//   console.log("Token: ",token);
  
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default userAuthRouter;
