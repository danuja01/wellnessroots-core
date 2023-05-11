import { Joi } from "celebrate";

export const createItemSchema = Joi.object({
  title: Joi.string().optional(),
  message: Joi.string().optional(),
  category: Joi.string().optional(),
  price: Joi.number().required(),
  seller: Joi.string().required(),
  selectedFile: Joi.string().required(),
});

// export const updateItemSchema = Joi.object({
//   title: Joi.string().optional(),
//   message: Joi.string().optional(),
//   category: Joi.string().optional(),
//   price: Joi.number().required(),
//   seller: Joi.string().required(),
//   selectedFile: Joi.string().required(),
// });
