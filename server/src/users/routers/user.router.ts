import upload from "../../shared/utils/multer";
import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const userController = new UserController();

const router = Router();

router.patch("/:id/avatar", upload.single("file"), userController.updateUserAvatar);
router.put("/", userController.updateUserInfo);

export default router;
