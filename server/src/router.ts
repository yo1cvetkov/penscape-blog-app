import { Router } from "express";

import authRoutes from "./users/routers/auth.router";
import postsRoutes from "./posts/routers/posts.router";
import usersRoutes from "./users/routers/user.router";
import categoryRoutes from "./categories/routers/category.router";
import commentsRouter from "./comments/routers/comments.router";
import likesRouter from "./likes/routers/likes.router";
import { authenticate } from "./shared/middlewares/auth.middleware";
const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/users", authenticate, usersRoutes);
router.use("/category", categoryRoutes);
router.use("/comments", commentsRouter);
router.use("/likes", likesRouter);

export default router;
