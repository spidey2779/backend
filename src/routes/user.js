import express from "express";
import { signup, login, authenticate, logout } from "../middleware/user.js";
import { authenticationMiddleware } from "../utils/authentication.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/auth", authenticationMiddleware,authenticate );
router.get('/logout',authenticationMiddleware,logout)
export default router;
