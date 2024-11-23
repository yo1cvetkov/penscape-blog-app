import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { CategoryService } from "../services/category.service";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";

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
}
