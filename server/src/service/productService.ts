import { Repository } from "typeorm";
import { Product } from "../entities/product";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class ProductRepository {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find({ relations: ["product_size"] });
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async getproductByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { category } = req.params;
      if (category === "clothes") {
        const products = await this.productRepository.find({ where: [{ product_category: "jacket" }, { product_category: "shirt" }], relations: ["product_size"] });
        return res.status(200).json({ products });
      } else {
        const products = await this.productRepository.find({ where: { product_category: category }, relations: ["product_size"] });
        return res.status(200).json({ products });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await this.productRepository.find({ where: { id: Number(id) }, relations: ["product_size"] });
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = req.body;
      console.log({ product });

      const newProduct = this.productRepository.create(product);
      await this.productRepository.save(newProduct);

      return res.status(200).json({ message: "product created" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
})();
