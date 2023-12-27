import wishListController from "../controllers/wishListController";
import { Router } from "express";

const router = Router();

router.get("/wish-list/:userId", wishListController.getWishListbyUser);
router.post("/wish-list", wishListController.createWishList);
router.delete("/wish-list/:id", wishListController.deleteWishList);

export default router;
