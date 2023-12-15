import { Request, Response } from "express";
import { User } from "../entities/user";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export default new (class UserService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async changeUserData(req: Request, res: Response): Promise<Response> {
    try {
      const { username, image, email,newEmail, role, address, phone } = req.body;
      console.log("body:", req.body);
      const dbUser = await this.userRepository.findOneBy({ email });
      const updatedUser = {
        ...dbUser,
        username: username || dbUser.username,
        image: image || dbUser.image,
        email: newEmail || dbUser.email,
        role: role || dbUser.role,
        address: address || dbUser.address,
        phone: phone || dbUser.phone,
      };

      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

      await this.userRepository.update({ email }, updatedUser);
      return res.status(200).json({
        message: "user updated",
        user: updatedUser,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
})();
