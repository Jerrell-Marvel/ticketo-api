import express from "express";
import { fileUpload } from "../middleware/fileUpload.js";
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.js";
import { validateFileCount } from "../middleware/validateFileCount.js";
import multer from "multer";
import { BadRequestError } from "../errors/BadRequestError.js";
import { getProductData } from "../middleware/products/getProductData.js";

// const storage = multer();
// const upload = multer();

const router = express.Router();

router.get("/products/:productId");
router.post("/products", fileUpload("./public/product-images").array("product-images", 12), createProduct);
// router.patch("/products/:productId", upload, validateFileCount, fileUpload("./public/product-images").array("product-images", 12), updateProduct);
router.patch("/products/:productId", getProductData, fileUpload("./public/product-images").array("product-images", 12), updateProduct);
// router.patch("/products/:productId", fileUpload("./public/product-images").array("product-images", 12), validateFileCount);
router.delete("/products/:productId", deleteProduct);

export default router;
