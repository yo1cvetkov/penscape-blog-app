import { Router } from "express";

import authRoutes from "./users/routers/auth.router";
import postsRoutes from "./posts/routers/posts.router";
import usersRoutes from "./users/routers/user.router";
import { authenticate } from "./shared/middlewares/auth.middleware";
const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/users", authenticate, usersRoutes);
export default router;
