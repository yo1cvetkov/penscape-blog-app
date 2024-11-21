import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, (req, res) => {
  res.status(201).json({ message: "You can see these posts." });
});

export default router;
