import { Request, Response } from "express";
import { UploadImageSchema } from "../models/image.models";
import imageService from "../services/image.service";
import { BaseController } from "../types/base.controller";
import { HttpError } from "../types/custom.error";

class ImagesController extends BaseController{
  async getImage(req: Request | any, res: Response) {
    try{
      const { id } = req.params;
      if(!id) throw new HttpError("Image id is required", 400);
      this.responseHandler(res, await imageService.findImageById(req.user.id, Number(id)), 200);
    }catch(error: any){
      this.errorHandler(res, error);
    }
  }

  async uploadImage(req: Request | any, res: Response) {
    try {
      const data = await UploadImageSchema.validateAsync(req.body);
      const result = await imageService.createImage(data, req.user);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
}

export default new ImagesController();
