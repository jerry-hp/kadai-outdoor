import transactionService from "../service/transactionService";
import { Request, Response } from "express";

export default new (class transactionController {
  async findAllTransactions(req: Request, res: Response): Promise<Response> {
    return await transactionService.findAllTransactions(req, res);
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
    return await transactionService.createTransaction(req, res);
  }

  async updateTransaction(req: Request, res: Response): Promise<Response> {
    return await transactionService.updateTransaction(req, res);
  }
})();
