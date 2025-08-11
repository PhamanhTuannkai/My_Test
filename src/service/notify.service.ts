import { INotify } from "../model/type/notify.type";
import Notify from "../model/entities/entity.notify.entity";
import { User } from "../model/entities/user.entities";
import dayjs from "dayjs";

export const createNotify = async (data: INotify, user: User) => {
  if (user.role !== "admin") {
    throw new Error("Permission denied: only admin can create notify");
  }
  const notify = new Notify(data);
  return await notify.save();
};

export const getNotifiesForUser = async (user: User) => {
  const filters: any[] = [{ level: "global" }];

  if (user.role === "staff" && user.branchId) {
    filters.push({ level: "branch", branchId: user.branchId });
  }

  filters.push({ level: "user", userId: user.id });

  if (user.role === "user") {
    filters.push({ type: "food", userId: user.id });
  }

  return await Notify.find({ $or: filters }).sort({ createdAt: -1 });
};

export const getNotifyById = async (id: string) => {
  return await Notify.findById(id);
};

export const updateNotify = async (
  id: string,
  data: Partial<INotify>,
  user: User
) => {
  if (user.role !== "admin" && user.role !== "staff") {
    throw new Error("Permission denied: only admin or staff can update notify");
  }
  return await Notify.findByIdAndUpdate(id, data, { new: true });
};

export const deleteNotify = async (id: string, user: User) => {
  if (user.role !== "admin") {
    throw new Error("Permission denied: only admin can delete notify");
  }
  return await Notify.findByIdAndDelete(id);
};

export const deleteOldNotifies = async () => {
  const thresholdDate = dayjs().subtract(30, "day").toDate();
  return await Notify.deleteMany({ createdAt: { $lt: thresholdDate } });
};
