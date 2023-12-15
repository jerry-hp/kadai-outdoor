import { Request, Response } from "express";
import { User } from "../entities/user";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export default new (class UserService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async changeUserData(req: Request, res: Response): Promise<Response> {
    try {
      const { image, email, role, address, phone } = req.body;
      console.log("body:", req.body);
      const dbUser = await this.userRepository.findOneBy({ email });
      const updatedUser = {
        ...dbUser,
        image: image || dbUser.image,
        email: email || dbUser.email,
        role: role || dbUser.role,
        address: address || dbUser.address,
        phone: phone || dbUser.phone,
      };

      await this.userRepository.update({ email }, updatedUser);
      return res.status(200).json({
        message: "user updated",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
})();
