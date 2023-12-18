import { Cart } from "../entities/cart";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class CartService {
  private readonly cartRepository: Repository<Cart> = AppDataSource.getRepository(Cart);

  async getCart(req: Request, res: Response): Promise<Response> {
    try {
      const carts = await this.cartRepository.find({ relations: ["user_id", "product_id"] });
      return res.status(200).json({ carts });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getCartbyUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      console.log(userId);

      const carts = await this.cartRepository.findOne({ where: { user_id: Number(userId) }, relations: ["user_id", "product_id"] });
      return res.status(200).json({ carts });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createCart(req: Request, res: Response): Promise<Response> {
    try {
      const cart = this.cartRepository.create(req.body);
      await this.cartRepository.save(cart);
      return res.status(200).json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
})();
