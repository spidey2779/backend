import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    const decodedlId = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedlId.id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found." });
    }
    next();
  } catch (err) {
    console.error("Error during authentication:", error);
    res
      .status(400)
      .json({ message: "Authentication Failed internal server error" });
  }
};
