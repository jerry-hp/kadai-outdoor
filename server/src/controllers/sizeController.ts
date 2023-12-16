import { Request, Response } from "express";
import sizeService from "../service/sizeService";

export default new (class sizeController {
  async createSize(req: Request, res: Response): Promise<Response> {
    return await sizeService.createSize(req, res);
  }
})();
