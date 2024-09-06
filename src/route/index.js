import { Router } from "express";
import { freshsalesCRMRouter } from "./freshsalesCRM";

export const rootRouter = Router();

rootRouter.use("/crm", freshsalesCRMRouter);