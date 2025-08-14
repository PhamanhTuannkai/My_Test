import { toNotifyDto } from "../common/notify.mapper";
import { canViewNotify } from "../common/notify.permission";
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
  const allNotifies = await Notify.find().sort({ createdAt: -1 });
  return allNotifies
    .filter((notify) => canViewNotify(user, notify))
    .map(toNotifyDto);
}

export async function getNotifyById(
  id: string,
  user: User
): Promise<NotifyDto | null> {
  const notify = await Notify.findById(id);
  if (!notify) return null;

  if (!canViewNotify(user, notify)) {
    throw new Error("Permission denied");
  }

  return toNotifyDto(notify);
}

export async function markNotifyAsRead(
  notifyId: string,
  user: User
): Promise<NotifyDto | null> {
  const notify = await Notify.findById(notifyId);
  if (!notify) return null;

  if (!canViewNotify(user, notify)) {
    throw new Error("Permission denied");
  }

  if (!notify.readBy.includes(user.id.toString())) {
    notify.readBy.push(user.id.toString());
    await notify.save();
  }

  return toNotifyDto(notify);
}
