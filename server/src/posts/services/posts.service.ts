import { validate } from "class-validator";
import { CreatePostDTO } from "../dtos/create-post.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import Post from "../models/post.model";
import { CreateDraftPostDTO } from "../dtos/create-draft-post.dto";
import { PostStatus } from "../../shared/types/PostStatus.enum";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UpdatePostDTO } from "../dtos/update-post.dto";

export class PostsService {
  static #instance: PostsService;

  private constructor() {}

  public static get instance(): PostsService {
    if (!PostsService.#instance) {
      PostsService.#instance = new PostsService();
    }

    return PostsService.#instance;
  }

  public async createDraftPost(createDraftPostDto: CreateDraftPostDTO) {
    const errors = await validate(createDraftPostDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const newDraftPost = await Post.create({
      title: createDraftPostDto.title,
      authorId: createDraftPostDto.authorId,
      categoryId: createDraftPostDto.categoryId,
      status: PostStatus.DRAFT,
    });

    return await newDraftPost.save();
  }

  public async updatePost(postId: string, updatePostDto: UpdatePostDTO) {
    const errors = await validate(updatePostDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const updateData: Partial<UpdatePostDTO> = {
      content: updatePostDto.content,
      tags: updatePostDto.tags,
    };

    // (Object.keys(updatePostDto) as (keyof UpdatePostDTO)[]).forEach((key) => {
    //   const value = updatePostDto[key];

    //   if (value !== undefined && value !== null) {
    //     updatePostDto[key] = value;
    //   }
    // });

    if (Object.keys(updatePostDto).length === 0) {
      throw new BadRequestException("no valid fields provided.");
    }

    const updatePost = await Post.findByIdAndUpdate(postId, { $set: updateData }, { new: true });

    if (!updatePost) {
      throw new NotFoundException("Post not found");
    }

    return updatePost;
  }

  public async getPostById(postId: string) {
    const post = await Post.findById(postId);

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    return post;
  }

  public async createPost(createPostDto: CreatePostDTO) {
    const errors = await validate(createPostDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const newPost = await Post.create(createPostDto);

    return await newPost.save();
  }

  public async publishPost(postId: string) {
    // TODO: Check if user is author

    const updatePost = await Post.findByIdAndUpdate(postId, { status: PostStatus.PUBLISHED });

    if (!updatePost) {
      throw new NotFoundException("Post not found.");
    }
  }
}
