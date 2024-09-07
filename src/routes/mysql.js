import { Router } from "express";
import {
    controllerCREATE,
    controllerDELETE,
    controllerGET,
    controllerUPDATE,
} from "../controller/mysql/index.js";

export const mysqlRouter = Router();

mysqlRouter.post("/createContact", controllerCREATE.createContact);
mysqlRouter.get("/getContact/:contactId", controllerGET.getContact);
mysqlRouter.put("/updateContact/:contactId", controllerUPDATE.updateContact);
mysqlRouter.delete("/deleteContact/:contactId", controllerDELETE.deleteContact);
