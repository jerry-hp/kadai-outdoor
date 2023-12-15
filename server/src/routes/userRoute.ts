import express from "express";
import userController from "../controllers/userController";
import outhMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/change-user-data", outhMiddleware, userController.changeUserData);

export default router;
