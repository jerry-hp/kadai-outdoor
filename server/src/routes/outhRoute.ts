import express from "express";
import { Request, Response } from "express";
import userController from "../controllers/outhController";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/google-sign-in", userController.googleSignIn);

export default router;
