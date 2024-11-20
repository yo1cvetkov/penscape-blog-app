import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../users/services/auth.service";
import { UserRole } from "../types/UserRole.enum";
import { User } from "../../users/types/User";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }

  try {
    const decoded = AuthService.instance.verifyToken(accessToken, process.env.JWT_SECRET!);

    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function checkRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as Partial<User>;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userRole = user.role!;

    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "Insufficient role" });
      return;
    }

    next();
  };
}
