import express from "express";
import {
  sellerLogin,
  isSellerAuth,
  sellerLogout,
  registerSeller,
} from "../controllers/sellerController.js";

const router = express.Router();

// Register Seller Route
router.post("/register", registerSeller);

// Existing routes
router.post("/login", sellerLogin);
router.get("/is-auth", isSellerAuth);
router.get("/logout", sellerLogout);

export default router;
