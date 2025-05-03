import express from "express";
import {
  sellerLogin,
  isSellerAuth,
  sellerLogout,
  registerSeller,
} from "../controllers/sellerController.js";
import { authenticateToken } from "../middlewares/authToken.js";

const router = express.Router();

// Register Seller Route
router.post("/register", registerSeller);

// Existing routes
router.post("/login", sellerLogin);
router.get("/is-auth", authenticateToken, isSellerAuth);
router.get("/logout", authenticateToken, sellerLogout);

export default router;
