import { Router } from "express";
import {
    controllerGET,
    controllerCREATE,
    controllerUPDATE,
    controllerDELETE,
} from "../controller/crm/index.js";

export const freshsalesCRMRouter = Router();

freshsalesCRMRouter.get("/get", controllerGET.getContact);
freshsalesCRMRouter.get("/create", controllerCREATE.createContact);
freshsalesCRMRouter.get("/update", controllerUPDATE.updateContact);
freshsalesCRMRouter.get("/delete", controllerDELETE.deleteContact);