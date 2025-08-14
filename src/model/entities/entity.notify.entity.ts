import { Schema, model, Document } from "mongoose";
import { INotify } from "../type/notify.type";

const NotifySchema = new Schema<INotify & Document>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["market", "food", "other"], required: true },
  level: { type: String, enum: ["global", "branch", "user"], required: true },
  createdBy: { type: String, required: true },
  branchId: { type: String },
  userId: { type: String },
  readBy: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default model<INotify & Document>("Notify", NotifySchema);
