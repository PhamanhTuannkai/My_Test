import { User } from "../model/entities/user.entities";

export function canViewNotify(user: User, notify: any): boolean {
  const sameBranch = user.branchId && user.branchId === notify.branchId;
  const sameUser = notify.userId && notify.userId === user.id.toString();

  if (notify.level === "global" || notify.type === "other") return true;

  if (notify.level === "branch") {
    if (user.role === "admin") return true;
    if (["branch-admin", "staff"].includes(user.role) && sameBranch)
      return true;
  }

  if (notify.level === "user" && sameUser) return true;

  if (notify.type === "food") {
    if (
      notify.level === "branch" &&
      (user.role === "admin" ||
        (["branch-admin", "staff"].includes(user.role) && sameBranch))
    ) {
      return true;
    }
    if (notify.level === "user" && user.role === "user" && sameUser) {
      return true;
    }
  }

  return false;
}
