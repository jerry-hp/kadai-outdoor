import { Repository } from "typeorm";
import { Product } from "../entities/product";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class ProductRepository {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find();
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = req.body;
      const newProduct = this.productRepository.create(product);
      await this.productRepository.save(newProduct);

      return res.status(200).json({ message: "product created" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
})();
