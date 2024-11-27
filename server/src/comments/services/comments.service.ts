import { validate } from "class-validator";
import { CreateCommentDTO } from "../dtos/create-comment.dto";
import Comment from "../models/comment.model";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import User from "../../users/models/user.model";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import Post from "../../posts/models/post.model";

export class CommentsService {
  static #instance: CommentsService;

  private constructor() {}

  public static get instance(): CommentsService {
    if (!CommentsService.#instance) {
      CommentsService.#instance = new CommentsService();
    }

    return CommentsService.#instance;
  }

  async getCommentsByPostId(postId: string) {
    const comments = await Comment.find({ postId }).populate("authorId", "username email profilePicture").exec();
    return comments;
  }

  async createComment(createCommentDto: CreateCommentDTO) {
    const errors = await validate(createCommentDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const findUser = await User.findById(createCommentDto.authorId);

    if (!findUser) {
      throw new NotFoundException("User not found");
    }

    const findPost = await Post.findByIdAndUpdate(createCommentDto.postId, { $inc: { comments: 1 } });

    if (!findPost) {
      throw new NotFoundException("Post not found");
    }

    const newComment = await Comment.create(createCommentDto);

    return await newComment.save();
  }
}
