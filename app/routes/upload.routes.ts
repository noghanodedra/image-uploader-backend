import { ImageUploadController } from "controllers";
import { Application, Request, Response } from "express";

export class Routes {
  private imageUploadController: ImageUploadController = new ImageUploadController();

  public routes(app: Application): void {
    app.route("/api/v1/uploads").post(this.imageUploadController.create);
  }
}
