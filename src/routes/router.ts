import { Application } from "express";
import imagesRouter from "./images";
import authRouter from "./auth";
import { authMiddleware } from "../middlewares/auth.middleware";

export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/images", authMiddleware, imagesRouter);
  app.use("/auth", authRouter);
}
