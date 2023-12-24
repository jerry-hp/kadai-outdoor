import cartService from "../service/cartService";
import { Request, Response } from "express";

export default new (class CartController {
  async getCart(req: Request, res: Response) {
    return await cartService.getCart(req, res);
  }

  async getCartbyUserId(req: Request, res: Response) {
    return await cartService.getCartbyUserId(req, res);
  }

  async createCart(req: Request, res: Response) {
    return await cartService.createCart(req, res);
  }

  async deleteCart(req: Request, res: Response) {
    return await cartService.deleteCart(req, res);
  }
})();
