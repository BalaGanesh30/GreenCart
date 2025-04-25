import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/is-auth", authenticateToken, isAuth);
router.get("/logout", authenticateToken, logout);

export default router;
