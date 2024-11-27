import Comment from "../models/comment.model";

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
    const comments = await Comment.find({ postId }).populate("authorId", "username email").exec();

    return comments;
  }
}
