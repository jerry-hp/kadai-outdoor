import { Request, Response } from "express";
import WishListService from "../service/wishListService";

export default new (class wishListController {
  async getWishListbyUser(req: Request, res: Response): Promise<Response> {
    return await WishListService.getWishListbyUser(req, res);
  }

  async createWishList(req: Request, res: Response): Promise<Response> {
    return await WishListService.createWishList(req, res);
  }

  async deleteWishList(req: Request, res: Response): Promise<Response> {
    return await WishListService.deleteWishList(req, res);
  }
})();
