import { validate } from "class-validator";
import { CreateLikeDTO } from "../dtos/create-like.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import User from "../../users/models/user.model";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import Post from "../../posts/models/post.model";
import Like from "../models/likes.model";

export class LikesService {
  static #instance: LikesService;

  private constructor() {}

  public static get instance(): LikesService {
    if (!LikesService.#instance) {
      LikesService.#instance = new LikesService();
    }

    return LikesService.#instance;
  }

  public async createLike(createLikeDto: CreateLikeDTO) {
    const errors = await validate(createLikeDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const findUser = await User.findById(createLikeDto.userId);

    if (!findUser) {
      throw new NotFoundException("User not found");
    }

    const findPost = await Post.findByIdAndUpdate(createLikeDto.postId, { $inc: { likes: 1 } });

    if (!findPost) {
      throw new NotFoundException("Post not found");
    }

    const like = await Like.create(createLikeDto);

    return await like.save();
  }
}
