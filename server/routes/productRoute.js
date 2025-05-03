import express from "express";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";
import { upload } from "../configs/multer.js";
import { authenticateToken } from "../middlewares/authToken.js";
const router = express.Router();

router.post("/add", authenticateToken, upload.array(["images"]), addProduct);
router.post("/stock", authenticateToken, changeStock);
router.get("/list", productList);
router.get("/id", productById);

export default router;
