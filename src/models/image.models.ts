import * as Joi from "joi";

export const UploadImageSchema = Joi.object({
  url: Joi.string().required(),
});