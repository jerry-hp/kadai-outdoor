import cartController from "../controllers/cartController";
import express from "express";
import outhMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/carts", outhMiddleware, cartController.getCart);
router.get("/cart/:userId", cartController.getCartbyUserId);
router.post("/cart", cartController.createCart);

export default router;
