import { Request, Response } from "express";
import { CommentsService } from "../services/comments.service";
import { TokenPayload } from "../../users/types/User";
import { plainToInstance } from "class-transformer";
import { CreateCommentDTO } from "../dtos/create-comment.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";

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

  async postComment(req: Request, res: Response) {
    const userId = (req.user as TokenPayload)._id;

    const postId = req.params.postId as string;

    if (!userId) {
      res.status(400).json({ message: "User id is missing" });
      return;
    }

    if (!postId) {
      res.status(400).json({ message: "Post id is missing" });
      return;
    }

    const postCommentDto = plainToInstance(CreateCommentDTO, { postId, authorId: userId, content: req.body.content });

    try {
      const comment = await CommentsService.instance.createComment(postCommentDto);

      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  }
}
