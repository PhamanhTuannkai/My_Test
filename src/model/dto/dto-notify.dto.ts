import { NotifyLevel, NotifyType } from "../type/notify.type";

export interface CreateNotifyDto {
  title: string;
  message: string;
  type: NotifyType;
  level: NotifyLevel;
  branchId?: string;
  userId?: string;
}
