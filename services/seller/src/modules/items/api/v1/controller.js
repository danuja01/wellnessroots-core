import express from "express";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreateItem,
  serviceGetItems,
  serviceGetItemById,
  serviceUpdateItemById,
  serviceDeleteItemById
} from "./service";

import { createItemSchema, updateItemSchema } from "./schema";

const item = express.Router();

item.post(
  "/",
  celebrate({ [Segments.BODY]: createItemSchema }),
  asyncHandler(async function controllerCreateReview(req, res) {
    const data = await serviceCreateItem(req.body);
    return toSuccess({ res, data, message: "Item created successfully!" });
  })
);

item.get(
  "/",
  filterQuery,
  asyncHandler(async function controllerGetReviews(req, res) {
    const data = await serviceGetItems(
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );
    return toSuccess({ res, data, message: "Items fetched successfully!" });
  })
);

item.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerGetReviewById(req, res) {
    const data = await serviceGetItemById(req.params.id);
    return toSuccess({ res, data, message: "Item fetched successfully!" });
  })
);

item.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updateItemSchema,
  }),
  asyncHandler(async function controllerUpdateItemById(req, res) {
    const data = await serviceUpdateItemById(req.params.id, req.body);
    return toSuccess({ res, data, message: "Item updated successfully!" });
  })
);

item.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerDeleteItemById(req, res) {
    const data = await serviceDeleteItemById(req.params.id);
    return toSuccess({ res, data, message: "Item deleted successfully!" });
  })
);


export default item;
