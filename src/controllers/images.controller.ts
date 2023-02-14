import { Request, Response } from "express";
import { UploadImageSchema } from "../models/image.models";
import imageService from "../services/image.service";
import { BaseController } from "../types/base.controller";

class ImagesController extends BaseController{
  async getImage(req: Request, res: Response) {
    try{
      const result = await imageService.findImageById(Number(req.params.id));
        this.responseHandler(res, result, 200);
    }catch(error: any){
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "Image not found" }, 404);
      }
      this.errorHandler(res, error);
    }
  }

  async uploadImage(req: Request, res: Response) {
    try {
      const data = await UploadImageSchema.validateAsync(req.body);
      const result = await imageService.createImage(data.url);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "Image was already uploaded" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }
}

export default new ImagesController();
