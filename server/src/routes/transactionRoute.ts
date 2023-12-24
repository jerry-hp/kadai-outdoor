import express from "express";
import transactionController from "../controllers/transactionController";

const router = express.Router();

router.get("/transactions", transactionController.findAllTransactions);
router.post("/transaction", transactionController.createTransaction);

export default router;
