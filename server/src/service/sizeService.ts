import { Repository } from "typeorm";
import { Size } from "../entities/size";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class SizeService {
  private readonly sizeRepository: Repository<Size> = AppDataSource.getRepository(Size);

  async createSize(req: Request, res: Response): Promise<Response> {
    try {
      const { product, size } = req.body;
      if (!product || !size) return res.status(400).json({ error: "Missing required fields" });

      const newSize = this.sizeRepository.create({ product, size });
      await this.sizeRepository.save(newSize);
      return res.status(200).json({ message: "Size created", size: newSize });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
})();
