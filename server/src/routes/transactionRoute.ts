import express from "express";
import transactionController from "../controllers/transactionController";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/transactions", authMiddleware, transactionController.findAllTransactions);
router.post("/transaction", authMiddleware, transactionController.createTransaction);
router.put("/transaction/:id", authMiddleware, transactionController.updateTransaction);

export default router;
