import { Router } from "express";
import { contactRouter } from "./freshsalesCRM.js";

export const rootRouter = Router();

rootRouter.use("/contact", contactRouter);