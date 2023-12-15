import { AppDataSource } from "./data-source";
import express from "express";
import cors from "cors";
import outhRoute from "./routes/outhRoute";
import ProductRoute from "./routes/ProductRoute";
import userRoute from "./routes/userRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api", outhRoute);
    app.use("/api", ProductRoute);
    app.use("/api", userRoute);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log("Error initializing AppDataSource:", error));