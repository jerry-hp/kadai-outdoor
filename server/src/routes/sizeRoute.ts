import sizeController from "../controllers/sizeController";
import express from "express";

const router = express.Router();

router.post("/size", sizeController.createSize);

export default router;
