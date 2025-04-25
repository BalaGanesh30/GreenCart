import express from "express";
import { updateCart } from "../controllers/cartController.js";
import { authenticateToken } from "../middlewares/authToken.js";

const router = express.Router();

router.post("/update", authenticateToken, updateCart);

export default router;
