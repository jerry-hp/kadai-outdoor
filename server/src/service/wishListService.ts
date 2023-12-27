import { Request, Response } from "express";
import { Repository } from "typeorm";
import { WishList } from "../entities/wistList";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product";

export default new (class WishListService {
  private readonly wishListRepository: Repository<WishList> = AppDataSource.getRepository(WishList);
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  async getWishListbyUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const wishList = await this.wishListRepository.find({ where: { user: { id: Number(userId) } }, relations: ["user", "products"] });
      console.log({ wishList });
      return res.status(200).json({ wishList });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async createWishList(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, productId } = req.body;
      console.log({ userId, productId });

      const product = await this.productRepository.findOne({ where: { id: Number(productId) } });

      const wishList = this.wishListRepository.create({ user: userId, products: [product] });
      await this.wishListRepository.save(wishList);
      return res.status(200).json({ message: "wishList created", wishList });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async deleteWishList(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const wishList = await this.wishListRepository.findOneBy({ id: Number(id) });
      await this.wishListRepository.softRemove(wishList);
      return res.status(200).json({ message: "wishList deleted", wishList });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
