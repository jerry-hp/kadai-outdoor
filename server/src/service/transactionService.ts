import { Request, Response } from "express";
import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Transactions } from "../entities/Transactions";
import { Cart } from "../entities/cart";

export default new (class TransactionService {
  private transactionRepository: Repository<Transactions> = AppDataSource.getRepository(Transactions);
  private CartRepository: Repository<Cart> = AppDataSource.getRepository(Cart);

  async findAllTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const transactions = await this.transactionRepository.find({ relations: ["user", "carts", "carts.product_id"] });
      return res.status(200).json({ transactions });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id, status } = req.body;
      const dbCart = await this.CartRepository.find({ where: { user: { id: user_id } }, relations: ["product_id"] });
      if (!dbCart) return res.status(404).json({ message: "Cart not found" });

      const amount = dbCart.reduce((prev, curr) => prev + curr.total_price, 0);
      // console.log({ dbCart, amount });

      const newTransaction = {
        user: user_id,
        amount,
        status,
        carts: dbCart,
      };

      this.transactionRepository.create(newTransaction);
      const Transaction = await this.transactionRepository.save(newTransaction);
      return res.status(200).json({ message: "Transaction created", Transaction });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
})();
