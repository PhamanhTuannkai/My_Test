import { User } from "../model/entities/user.entities";

export function canViewNotify(user: User, notify: any): boolean {
  const sameBranch = user.branchId && user.branchId === notify.branchId;
  const sameUser = notify.userId && notify.userId === user.id.toString();

  if (notify.level === "global") return true;

  if (notify.level === "branch") {
    if (user.role === "admin") return true;
    if (["staff", "branch-admin"].includes(user.role) && sameBranch)
      return true;
  }

  if (notify.level === "user" && sameUser) return true;

  if (notify.type === "food") {
    if (["branch-admin", "staff"].includes(user.role) && sameBranch)
      return true;
    if (user.role === "admin") return true;
    if (user.role === "user" && sameUser) return true;
  }

  return false;
}
