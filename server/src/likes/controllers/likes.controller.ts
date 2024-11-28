import { Response, Request } from "express";
import { TokenPayload } from "../../users/types/User";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { LikesService } from "../services/likes.service";
import { plainToInstance } from "class-transformer";
import { CreateLikeDTO } from "../dtos/create-like.dto";

export class LikesController {
  async postComment(req: Request, res: Response) {
    const userId = (req.user as TokenPayload)._id;

    if (!userId) {
      res.status(400).json({ message: "User id is missing." });
      return;
    }

    const postId = req.params.postId as string;

    if (!postId) {
      res.status(400).json({ message: "Post id is missing." });
      return;
    }
    const createLikeDto = plainToInstance(CreateLikeDTO, { userId, postId });

    try {
      await LikesService.instance.createLike(createLikeDto);

      res.status(200).json({ message: "Liked successfully" });
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
