import ProductController from "../controllers/productController";
import express from "express";
import outhMiddleware from "../middlewares/auth";
import FileUpload from "../middlewares/FileMiddleware";

const router = express.Router();
const UploadMiddleWare = new FileUpload("product_image");

router.get("/products", ProductController.getProducts);
router.get("/product/:category", ProductController.getproductByCategory);
router.get("/products/:id", ProductController.getProductById);
router.post("/product", UploadMiddleWare.handleUpload.bind(UploadMiddleWare), ProductController.createProduct);
router.delete("/product/:id", ProductController.deleteProduct);

export default router;
