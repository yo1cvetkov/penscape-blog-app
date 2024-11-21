import { Router } from "express";

import authRoutes from "./users/routers/auth.router";
import postsRoutes from "./posts/routers/posts.router";
const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);

export default router;
