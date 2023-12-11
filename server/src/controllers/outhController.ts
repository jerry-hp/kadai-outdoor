import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { Request, Response } from "express";
import OauthService from "../service/OauthService";

export default new (class OuthController {
  async signUp(req: Request, res: Response): Promise<Response> {
    return await OauthService.SignUp(req, res);
  }
  async signIn(req: Request, res: Response): Promise<Response> {
    return await OauthService.SignIn(req, res);
  }

  async googleSignIn(req: Request, res: Response): Promise<Response> {
    return await OauthService.googleSignIn(req, res);
  }
})();
