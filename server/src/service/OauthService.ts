import { Repository } from "typeorm";
import { User } from "../entities/user";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default new (class OauthService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async SignUp(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      const dbUsername = await this.userRepository.findOneBy({ username });
      if (dbUsername) return res.status(400).json({ message: "username already exists" });

      const dbEmail = await this.userRepository.findOneBy({ email });
      if (dbEmail) return res.status(400).json({ message: "email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        username,
        email,
        password: hashedPassword,
      };
      this.userRepository.create(user);
      await this.userRepository.save(user);

      return res.status(200).json({ message: "user created", user });
    } catch (error) {
      console.log(error);
    }
  }

  async SignIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findOneBy({ email });
      if (!user) return res.status(400).json({ message: "user not found" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(400).json({ message: "password not match" });

      return res.status(200).json({ message: "user signed in", user });
    } catch (error) {
      console.log(error);
    }
  }
})();
