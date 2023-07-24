import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addCart, getCart, updateCart } from "../controllers/cart.js";

const router = express.Router();

router.post("/cart", authMiddleware, addCart);
router.get("/cart", authMiddleware, getCart);
router.patch("/cart", authMiddleware, updateCart);

export default router;
