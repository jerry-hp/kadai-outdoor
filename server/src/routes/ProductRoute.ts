import ProductController from "../controllers/productController";
import express from "express";
import outhMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.get("/product/:category", ProductController.getproductByParams);
router.post("/product", outhMiddleware, ProductController.createProduct);

export default router;
