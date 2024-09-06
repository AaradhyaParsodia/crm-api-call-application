import { Router } from "express";
import { freshsalesCRMRouter } from "./freshsalesCRM.js";

export const rootRouter = Router();

rootRouter.use("/crm", freshsalesCRMRouter);