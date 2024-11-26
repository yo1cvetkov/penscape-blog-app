import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { CategoryService } from "../services/category.service";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    const createCategoryDto = plainToInstance(CreateCategoryDTO, req.body);

    try {
      const newCategory = await CategoryService.instance.createCategory(createCategoryDto);

      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Someting went wrong." });
      }
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.instance.getAllCategories();

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getCategory(req: Request, res: Response) {
    const categoryId = req.params.id;

    if (!categoryId) {
      res.status(400).json({ message: "Category Id is missing" });
      return;
    }

    try {
      const category = await CategoryService.instance.getCategoryById(categoryId);

      res.status(200).json(category);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
}
