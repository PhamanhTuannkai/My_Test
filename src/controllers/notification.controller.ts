import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Request,
  Route,
  Tags,
} from "tsoa";
import * as notifyService from "../service/notify.service";
import { User } from "../model/entities/user.entities";
import { CreateNotifyDto, NotifyDto } from "../model/dto/dto-notify.dto";

@Route("notifies")
@Tags("Notify")
export class NotifyController extends Controller {
  private getUserFromRequest(req: Request): User {
    return (req as any).user;
  }

  @Post("/")
  public async createNotify(
    @Body() data: CreateNotifyDto,
    @Request() req: Request
  ): Promise<NotifyDto | { message: string }> {
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
  public async getNotifies(
    @Request() req: Request
  ): Promise<NotifyDto[] | { message: string }> {
    const user = this.getUserFromRequest(req);
    if (!user) {
      this.setStatus(401);
      return [];
    }
    const notifies = await notifyService.getNotifiesForUser(user);
    return notifies;
  }

  @Get("{id}")
  public async getNotifyById(
    @Path() id: string
  ): Promise<NotifyDto | { message: string }> {
    const notify = await notifyService.getNotifyById(id);
    if (!notify) {
      this.setStatus(404);
      return { message: "Notify not found" };
    }
    return notify;
  }

  @Post("{id}/read")
  public async markAsRead(
    @Path() id: string,
    @Request() req: Request
  ): Promise<NotifyDto | { message: string }> {
    const user = this.getUserFromRequest(req);
    if (!user) {
      this.setStatus(401);
      return { message: "Unauthorized" };
    }

    const updated = await notifyService.markNotifyAsRead(id, user);
    if (!updated) {
      this.setStatus(404);
      return { message: "Notify not found" };
    }

    return updated;
  }
}
