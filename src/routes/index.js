import { Router } from "express";
import { contactRouter } from "./contactRoutes.js";

export const rootRouter = Router();

rootRouter.use("/contact", contactRouter);