import { Router } from "express";

import authRoutes from "./users/routers/auth.router";

const router = Router();

router.use("/auth", authRoutes);

export default router;
