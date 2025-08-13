import { Document } from "mongoose";
import { NotifyDto } from "../model/dto/dto-notify.dto";

export function toNotifyDto(doc: Document & any): NotifyDto {
  return {
    id: doc._id.toString(),
    title: doc.title,
    message: doc.message,
    type: doc.type,
    level: doc.level,
    createdBy: doc.createdBy,
    branchId: doc.branchId,
    userId: doc.userId,
    readBy: doc.readBy,
    createdAt: doc.createdAt,
  };
}
