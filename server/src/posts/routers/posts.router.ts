import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware";
import { PostsController } from "../controllers/posts.controller";

const router = Router();

const postsController = new PostsController();

router.get("/", authenticate, (req, res) => {
  res.status(201).json({ message: "You can see these posts." });
});
router.post("/", authenticate, postsController.createNewPost);

export default router;
