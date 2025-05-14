import { Router } from "express";
import { menuRouter } from "./menu.router";
import { orderRouter } from "./order.router";

export const apiRouter = Router();

// /api/v1/menus
apiRouter.use('/menus', menuRouter);
apiRouter.use('/orders', orderRouter);
