import { Router, Request, Response } from "express";
import { MenuModel } from "../models";

export const menuRouter = Router();

// URL: http://localhost:8000/api/v1/menus

menuRouter.get("/", async (_: Request, res: Response) => {
  const menus = await MenuModel.find().populate("category_id"); // Populate userId with User fields
  res.status(200).json(menus);
});
