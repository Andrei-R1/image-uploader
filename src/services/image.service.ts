import { Image, User } from "@prisma/client"
import prisma from "../database/client";
import { HttpError } from "../types/custom.error";

class ImageService {
  async createImage(image: Image, user: User) {
    return prisma.image.create({
      data: {
        url: image.url,
        userId: user.id,
      }
    });
  }
  async findImageById(userId: number, id: number) {
      const image = await prisma.image.findUnique({ where: { id } });
      if (!image) {
        throw new HttpError("Image not found", 404);
      } else if (image.userId !== userId) {
        throw new HttpError("You are not authorized to view this image", 401);
      } else {
        return image;
      }
    }
}

export default new ImageService();