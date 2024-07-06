import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { generatetoken } from "../utils/generatetoken.js";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hasing the password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      res.status(400).json({ message: "invalid password" });
      return;
    }
    const token = generatetoken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res
      .status(200)
      .json({ user: user.username, message: "logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//checking user
export const authenticate = (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json({ user: user.username });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
