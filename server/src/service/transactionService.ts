import { Request, Response } from "express";
import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Transactions } from "../entities/Transactions";
import { Cart } from "../entities/cart";
import midtransClient from "midtrans-client";
import { config } from "dotenv";
config();

export default new (class TransactionService {
  private transactionRepository: Repository<Transactions> = AppDataSource.getRepository(Transactions);
  private CartRepository: Repository<Cart> = AppDataSource.getRepository(Cart);

  async findAllTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const transactions = await this.transactionRepository.find({ withDeleted: true, relations: ["user", "carts", "carts.product_id"] });
      return res.status(200).json({ transactions });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.body;
      const dbCart = await this.CartRepository.find({ where: { user: { id: user_id } }, relations: ["product_id"] });
      if (!dbCart) return res.status(404).json({ message: "Cart not found" });

      const amount = dbCart.reduce((prev, curr) => prev + curr.total_price, 0);

      const newTransaction = {
        user: user_id,
        amount,
        carts: dbCart,
      };

      this.transactionRepository.create(newTransaction);
      const Transaction = await this.transactionRepository.save(newTransaction);

      //midtrans config
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: Transaction.id,
          gross_amount: amount,
        },
        enabled_payments: ["bri_va"],
      };
      //hapus cart
      if (Transaction) {
        await this.CartRepository.softRemove(dbCart);
      }
      snap.createTransaction(parameter).then((transaction) => {
        const transactionToken = transaction.token;
        return res.status(200).json({ message: "Transaction created", transactionToken, Transaction });
      });

      // return res.status(200).json({ message: "Transaction created", Transaction });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  async updateTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const transaction = await this.transactionRepository.findOneBy({ id: Number(id) });
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
      transaction.status = status;
      await this.transactionRepository.save(transaction);
      return res.status(200).json({ message: "Transaction updated", transaction });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
})();
