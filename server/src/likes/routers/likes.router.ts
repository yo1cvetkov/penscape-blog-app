import { Router } from "express";

import { LikesController } from "../controllers/likes.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

const likesController = new LikesController();

const router = Router();

router.post("/:postId", authenticate, likesController.postComment);

export default router;
