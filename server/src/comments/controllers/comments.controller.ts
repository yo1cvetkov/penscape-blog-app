import { Request, Response } from "express";
import { CommentsService } from "../services/comments.service";

export class CommentsController {
  async getPostComments(req: Request, res: Response) {
    const postId = req.params.postId;

    if (!postId) {
      res.status(400).json({ message: "Post id is missing" });
      return;
    }

    try {
      const comments = await CommentsService.instance.getCommentsByPostId(postId);

      res.status(200).json(comments);
    } catch (error) {}
  }
}
