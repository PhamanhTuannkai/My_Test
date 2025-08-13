import { User } from "../model/entities/user.entities";

export function canViewNotify(user: User, notify: any): boolean {
  // 1. Global
  if (notify.level === "global") return true;

  // 2. Branch-level
  if (notify.level === "branch") {
    if (user.role === "admin") return true;
    if (
      ["staff", "branch-admin"].includes(user.role) &&
      user.branchId === notify.branchId
    )
      return true;
  }

  // 3. User-level
  if (notify.level === "user" && notify.userId === user.id.toString())
    return true;

  // 4. Food-type
  if (notify.type === "food") {
    if (user.role === "admin") return true;
    if (
      ["staff", "branch-admin"].includes(user.role) &&
      user.branchId === notify.branchId
    )
      return true;
    if (user.role === "user" && notify.userId === user.id.toString())
      return true;
  }

  return false;
}
