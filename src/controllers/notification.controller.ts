import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Request,
  Route,
  Tags,
} from "tsoa";
import { INotify } from "../model/type/notify.type";
import * as notifyService from "../service/notify.service";
import { User } from "../model/entities/user.entities";

@Route("notifies")
@Tags("Notify")
export class NotifyController extends Controller {
  private getUserFromRequest(req: Request): User {
    return (req as any).user;
  }

  @Post("/")
  public async createNotify(@Body() data: INotify, @Request() req: Request) {
    const user = this.getUserFromRequest(req);
    if (!user || user.role !== "admin") {
      this.setStatus(403);
      return { message: "Permission denied: only admin can create notify" };
    }
    const notify = await notifyService.createNotify(data, user);
    this.setStatus(201);
    return notify;
  }

  @Get("/")
  public async getNotifies(@Request() req: Request) {
    const user = this.getUserFromRequest(req);
    if (!user) {
      this.setStatus(401);
      return { message: "Unauthorized" };
    }
    const notifies = await notifyService.getNotifiesForUser(user);
    return notifies;
  }

  @Get("{id}")
  public async getNotifyById(@Path() id: string) {
    const notify = await notifyService.getNotifyById(id);
    if (!notify) {
      this.setStatus(404);
      return { message: "Notify not found" };
    }
    return notify;
  }

  @Delete("{id}")
  public async deleteNotify(@Path() id: string, @Request() req: Request) {
    const user = this.getUserFromRequest(req);
    if (!user || user.role !== "admin") {
      this.setStatus(403);
      return { message: "Permission denied: only admin can delete notify" };
    }
    const notify = await notifyService.deleteNotify(id, user);
    if (!notify) {
      this.setStatus(404);
      return { message: "Notify not found" };
    }
    return { message: "Notify deleted" };
  }
}
