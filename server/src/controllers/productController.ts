import ProductService from "../service/productService";
import { Request, Response } from "express";

export default new (class ProductController {
  async getProducts(req: Request, res: Response): Promise<Response> {
    return await ProductService.getProducts(req, res);
  }
  async createProduct(req: Request, res: Response): Promise<Response> {
    return await ProductService.createProduct(req, res);
  }
})();
