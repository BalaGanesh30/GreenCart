import express from "express";
import { authenticateToken } from "../middlewares/authToken.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderRazorpay,
  verifyPayment,
} from "../controllers/orderController.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.post("/cod", authenticateToken, placeOrderCOD);
router.post("/razorpay", authenticateToken, placeOrderRazorpay); // 🔄 Razorpay order creation
router.post("/verify", authenticateToken, verifyPayment); // ✅ Payment verification

router.get("/user", authenticateToken, getUserOrders);
router.get("/seller", authSeller, getAllOrders);

export default router;
