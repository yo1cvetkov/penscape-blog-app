import { Request, Response } from "express";
import { TokenPayload } from "../../users/types/User";
import { plainToInstance } from "class-transformer";
import { CreatePostDTO } from "../dtos/create-post.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import { PostsService } from "../services/posts.service";
import { CreateDraftPostDTO } from "../dtos/create-draft-post.dto";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UpdatePostDTO } from "../dtos/update-post.dto";

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

  public async updatePost(req: Request, res: Response) {
    const postId = req.params.id as string;

    if (!postId) {
      res.status(400).json({ message: "No post id provided" });
      return;
    }

    console.log("body", req.body);

    const updatePostDto = plainToInstance(UpdatePostDTO, req.body);

    try {
      const post = await PostsService.instance.updatePost(postId, updatePostDto);

      res.status(200).json(post);
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

  async getPostById(req: Request, res: Response) {
    const postId = req.params.id;

    if (!postId) {
      res.status(400).json({ message: "No post id provided" });
      return;
    }

    try {
      const post = await PostsService.instance.getPostById(postId);

      res.status(200).json(post);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: "Post not found." });
      }
    }
  }

  async createNewDraftPost(req: Request, res: Response) {
    const userId = (req.user as TokenPayload)._id as string;

    const newDraftPostData = { ...req.body, authorId: userId };

    const createDraftPostDto = plainToInstance(CreateDraftPostDTO, newDraftPostData);

    try {
      const newDraftPost = await PostsService.instance.createDraftPost(createDraftPostDto);

      res.status(201).json(newDraftPost);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  }

  async publishPost(req: Request, res: Response) {
    const postId = req.params.id as string;

    if (!postId) {
      res.status(400).json({ message: "Post id is missing" });
    }

    try {
      await PostsService.instance.publishPost(postId);

      res.status(201).json({ message: "Published post" });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: "Post not found" });
      } else {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  }
}
