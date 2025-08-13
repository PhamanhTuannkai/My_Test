import { toNotifyDto } from "../common/notify.mapper";
import { CreateNotifyDto, NotifyDto } from "../model/dto/dto-notify.dto";
import Notify from "../model/entities/entity.notify.entity";
import { User } from "../model/entities/user.entities";

export async function createNotify(
  data: CreateNotifyDto,
  user: User
): Promise<NotifyDto> {
  if (user.role !== "admin") throw new Error("Permission denied");

  const notify = new Notify({
    ...data,
    createdBy: user.id,
    createdAt: new Date(),
    readBy: [],
  });

  const saved = await notify.save();
  return toNotifyDto(saved);
}

export async function getNotifiesForUser(user: User): Promise<NotifyDto[]> {
  const filters: any[] = [{ level: "global" }];

  if (user.role === "staff" && user.branchId) {
    filters.push({ level: "branch", branchId: user.branchId });
  }

  filters.push({ level: "user", userId: user.id });

  if (user.role === "user") {
    filters.push({ type: "food", userId: user.id });
  }

  const docs = await Notify.find({ $or: filters }).sort({ createdAt: -1 });
  return docs.map(toNotifyDto);
}

export async function getNotifyById(id: string): Promise<NotifyDto | null> {
  const doc = await Notify.findById(id);
  if (!doc) return null;
  return toNotifyDto(doc);
}

export async function markNotifyAsRead(
  notifyId: string,
  user: User
): Promise<NotifyDto | null> {
  const notify = await Notify.findById(notifyId);
  if (!notify) return null;

  if (!notify.readBy.includes(user.id.toString())) {
    notify.readBy.push(user.id.toString());
    await notify.save();
  }

  return toNotifyDto(notify);
}
