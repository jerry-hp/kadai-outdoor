import { AppDataSource } from "./data-source";
import express from "express";
import cors from "cors";
import outhRoute from "./routes/outhRoute";
import ProductRoute from "./routes/ProductRoute";
import userRoute from "./routes/userRoute";
import sizeRoute from "./routes/sizeRoute";
import cartRoute from "./routes/cartRoute";
import transactionRoute from "./routes/transactionRoute";
import wishListRoute from "./routes/wishListRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api", outhRoute);
    app.use("/api", ProductRoute);
    app.use("/api", userRoute);
    app.use("/api", sizeRoute);
    app.use("/api", cartRoute);
    app.use("/api", transactionRoute);
    app.use("/api", wishListRoute);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log("Error initializing AppDataSource:", error));
