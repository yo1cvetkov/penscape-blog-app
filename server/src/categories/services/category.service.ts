import { validate } from "class-validator";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import Category from "../models/category.model";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";

export class CategoryService {
  static #instance: CategoryService;

  private constructor() {}

  public static get instance(): CategoryService {
    if (!CategoryService.#instance) {
      CategoryService.#instance = new CategoryService();
    }

    return CategoryService.#instance;
  }

  async createCategory(createCategoryDTO: CreateCategoryDTO) {
    const errors = await validate(createCategoryDTO);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const newCategory = await Category.create(createCategoryDTO);

    return await newCategory.save();
  }

  async getAllCategories() {
    return await Category.find();
  }

  async getCategoryById(categoryId: string) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return category.toObject();
  }
}
