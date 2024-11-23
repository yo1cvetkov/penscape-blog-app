import { validate } from "class-validator";
import { CreatePostDTO } from "../dtos/create-post.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import Post from "../models/post.model";

export class PostsService {
  static #instance: PostsService;

  private constructor() {}

  public static get instance(): PostsService {
    if (!PostsService.#instance) {
      PostsService.#instance = new PostsService();
    }

    return PostsService.#instance;
  }

  public async createPost(createPostDto: CreatePostDTO) {
    const errors = await validate(createPostDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const newPost = await Post.create(createPostDto);

    return await newPost.save();
  }
}
