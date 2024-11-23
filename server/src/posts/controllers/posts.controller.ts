import { Request, Response } from "express";
import { TokenPayload } from "../../users/types/User";
import { plainToInstance } from "class-transformer";
import { CreatePostDTO } from "../dtos/create-post.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import { PostsService } from "../services/posts.service";

export class PostsController {
  async createNewPost(req: Request, res: Response) {
    const userId = (req.user as TokenPayload)._id as string;

    const newPostData = { ...req.body, authorId: userId };

    const createPostDto = plainToInstance(CreatePostDTO, newPostData);

    try {
      const newPost = await PostsService.instance.createPost(createPostDto);

      res.status(201).json(newPost);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).send({ message: "Something went wrong." });
      }
    }
  }
}
