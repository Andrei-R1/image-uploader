import { Image } from "@prisma/client"
import prisma from "../database/client";

class ImageService {
  createImage(image: Image) {
    return prisma.image.create({ data: image });
  }
  findImageById(id: number) {
    return prisma.image.findFirst({ where: { id } });
  }
}

export default new ImageService();