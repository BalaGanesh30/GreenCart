import express from "express";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";
import { upload } from "../configs/multer.js";
import { authSeller } from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/add", authSeller, upload.array(["images"]), addProduct);
router.post("/stock", authSeller, changeStock);
router.get("/list", productList);
router.get("/id", productById);

export default router;
