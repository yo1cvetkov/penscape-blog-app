import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

const authController = new AuthController();

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticate, authController.logout);
router.post("/refresh", authController.refresh);
router.get("/me", authenticate, authController.whoAmI);

export default router;
