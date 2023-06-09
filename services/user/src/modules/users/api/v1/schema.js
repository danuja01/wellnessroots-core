import { Joi } from "celebrate";
import { roles } from "@app/constants";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  role: Joi.string()
    .valid(...Object.values(roles))
    .optional(),
  address: Joi.string().optional(),
  verification_code: Joi.string().optional().allow(null),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().optional(),
  address: Joi.string().optional(),
  is_verified: Joi.boolean().optional(),
  verification_code: Joi.string().optional().allow(null),
});
