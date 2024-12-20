import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware";
import { CommentsController } from "../controllers/comments.controller";

const router = Router();

const commmentsController = new CommentsController();

router.get("/:postId", authenticate, commmentsController.getPostComments);
router.post("/:postId", authenticate, commmentsController.postComment);

export default router;
