import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token" });
  }
  console.log({ bearerToken });
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log({ err });
      return res.status(401).json({ message: "Invalid token" });
    }
    req.body.user = decoded;
    next();
  });
};

export default authMiddleware;
