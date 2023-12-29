import { DeepPartial, ILike, Like, Repository } from "typeorm";
import { Product } from "../entities/product";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Size } from "./../entities/size";

export default new (class ProductRepository {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product);
  private readonly SizeRepository: Repository<Size> = AppDataSource.getRepository(Size);

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find({ relations: ["product_size"] });
      products.reverse();
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
        products.reverse();
        return res.status(200).json({ products });
      } else {
        const products = await this.productRepository.find({ where: { product_category: category }, relations: ["product_size"] });
        products.reverse();
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

  async searchProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { keyword } = req.query;
      
      const products = await this.productRepository.find({
        where: [{ product_name: ILike(`%${keyword}%`) }, { product_brand: ILike(`%${keyword}%`) }, { product_category: ILike(`%${keyword}%`) }, { product_description: ILike(`%${keyword}%`) }],
        relations: ["product_size"],
      });

      console.log({ products });
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { product_name, product_brand, product_category, product_price, product_description, product_size } = req.body;
      const size = product_size.split(",");
      const image = req.file.filename;

      //connecting to cloudinary
      cloudinary.config({
        cloud_name: "dn77yrxug",
        api_key: "565913931669896",
        api_secret: "2OyoaMXeXv0PRGsM0_yo-Hx0u2c",
      });

      // uploading image to cloudinary
      let imagesrc;
      if (image) {
        const cloudinaryResponse = await cloudinary.uploader.upload("src/uploads/" + image, { folder: "kadai_outdoor" });
        imagesrc = cloudinaryResponse.secure_url;
      }
      console.log({ imagesrc });

      //product baru
      const newProduct = {
        product_name: product_name,
        product_brand: product_brand,
        product_category: product_category,
        product_price: product_price,
        product_description: product_description,
        product_image: imagesrc,
      };

      this.productRepository.create(newProduct);
      const productCreated = await this.productRepository.save(newProduct);

      // create size
      size.map(async (size: string) => {
        const createSize: DeepPartial<Size> = {
          product: { id: productCreated.id },
          size: size,
        };
        this.SizeRepository.create(createSize);
        await this.SizeRepository.save(createSize);
      });

      return res.status(200).json({ message: "product created", product: productCreated });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      // softdelete
      const product = await this.productRepository.findOneBy({ id: Number(id) });
      console.log({ product });
      if (!product) return res.status(404).json({ message: "product not found" });
      await this.productRepository.manager.softRemove(product);
      return res.status(200).json({ message: "product deleted" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
})();
