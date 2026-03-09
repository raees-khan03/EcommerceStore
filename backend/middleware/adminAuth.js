import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Get token from headers
    const { token } = req.headers;

    console.log("Token received:", token ? token.substring(0, 30) + "..." : "NO TOKEN");

    // Check if token exists
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized login again",
      });
    }

    // FIXED: Decode the token first
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Token decoded:", token_decode.email);
    console.log("Token decoded:", token_decode.ADMIN_PASSWORD);

    // FIXED: Compare the decoded values (email and password) with environment variables
    // The token should contain admin email and password
    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not authorized login again",
      });
    }

    // Token is valid, continue to next middleware/route
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default adminAuth;