import express from "express";
import { authenticateToken } from "../middlewares/authToken.js";
import { addAddress, getAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", authenticateToken, addAddress);
router.get("/get", authenticateToken, getAddress);

export default router;
