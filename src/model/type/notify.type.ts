export type NotifyType = "market" | "food";
export type NotifyLevel = "global" | "branch" | "user";

export interface INotify {
  id?: string;
  title: string;
  message: string;
  type: NotifyType;
  level: NotifyLevel;
  createdBy: string;
  branchId?: string;
  userId?: string;
  readBy: string[];
  createdAt: Date;
}
