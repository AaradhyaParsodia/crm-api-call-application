import { Router } from "express";
import {
    controllerGET,
    controllerCREATE,
    controllerUPDATE,
    controllerDELETE,
} from "../controller/index.js";

export const contactRouter = Router();

contactRouter.post("/createContact", controllerCREATE.createContact);
contactRouter.get("/getContact/:contactId", controllerGET.getContact);
contactRouter.put("/updateContact/:contactId", controllerUPDATE.updateContact);
contactRouter.delete("/deleteContact/:contactId", controllerDELETE.deleteContact);