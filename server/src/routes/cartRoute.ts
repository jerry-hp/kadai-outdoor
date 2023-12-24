import cartController from "../controllers/cartController";
import express from "express";
import outhMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/carts", outhMiddleware, cartController.getCart);
router.get("/cart/:userId", outhMiddleware, cartController.getCartbyUserId);
router.post("/cart", outhMiddleware, cartController.createCart);
router.delete("/cart/:id", cartController.deleteCart);

export default router;
