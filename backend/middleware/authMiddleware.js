import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // check token in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // get token
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from DB (without password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // move to next
    } else {
      return res.status(401).json({ message: "No token, access denied" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};

export default protect;