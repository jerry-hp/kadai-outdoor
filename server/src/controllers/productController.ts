import ProductService from "../service/productService";
import { Request, Response } from "express";

export default new (class ProductController {
  async getProducts(req: Request, res: Response): Promise<Response> {
    return await ProductService.getProducts(req, res);
  }

  async searchProduct(req: Request, res: Response): Promise<Response> {
    return await ProductService.searchProduct(req, res);
  }

  async getproductByCategory(req: Request, res: Response): Promise<Response> {
    return await ProductService.getproductByCategory(req, res);
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    return await ProductService.getProductById(req, res);
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    return await ProductService.createProduct(req, res);
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    return await ProductService.deleteProduct(req, res);
  }
})();
