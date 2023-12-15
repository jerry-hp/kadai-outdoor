import { Request, Response } from "express";
import UserService from "../service/userService";

export default new (class UserController {
  async changeUserData(req: Request, res: Response): Promise<Response> {
    return await UserService.changeUserData(req, res);
  }
})();
