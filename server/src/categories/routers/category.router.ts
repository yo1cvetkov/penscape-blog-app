import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

const categoryController = new CategoryController();

const router = Router();

router.post("/", authenticate, categoryController.createCategory);
router.get("/", authenticate, categoryController.getAllCategories);

export default router;
