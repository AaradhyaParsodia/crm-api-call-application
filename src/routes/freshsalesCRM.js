import { Router } from "express";
import {
    controllerGET,
    controllerCREATE,
    controllerUPDATE,
    controllerDELETE,
} from "../controller/crm/index.js";

export const freshsalesCRMRouter = Router();

freshsalesCRMRouter.post("/createContact", controllerCREATE.createContact);
freshsalesCRMRouter.get("/getContact/:contactId", controllerGET.getContact);
freshsalesCRMRouter.put("/updateContact/:contactId", controllerUPDATE.updateContact);
freshsalesCRMRouter.delete("/deleteContact/:contactId", controllerDELETE.deleteContact);