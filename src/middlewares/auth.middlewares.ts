import { Request, Response, NextFunction } from "express";
import { User } from "../model/entities/user.entities";

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.query.userId as string;

    const users: Record<string, User> = {
      "1": { id: "1", name: "Super Admin", role: "admin" },
      "2": { id: "2", name: "Branch Admin B1", role: "branch-admin", branchId: "b1" },
      "3": { id: "3", name: "Staff B1", role: "staff", branchId: "b1" },
      "4": { id: "4", name: "Staff B2", role: "staff", branchId: "b2" },
      "u1": { id: "u1", name: "User 1", role: "user" },
      "u2": { id: "u2", name: "User 2", role: "user" },
    };

    if (userId && users[userId]) {
      req.user = users[userId];
    } else {

      req.user = users["u1"];
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: " + error });
  }
};
