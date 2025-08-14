export type NotifyType = "market" | "food" | "other";
export type NotifyLevel = "global" | "branch" | "user";

export interface NotifyDto {
  id: string;
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

export interface CreateNotifyDto {
  title: string;
  message: string;
  type: NotifyType;
  level: NotifyLevel;
  branchId?: string;
  userId?: string;
}
