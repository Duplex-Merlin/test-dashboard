import { Router } from "express";
import { logsData } from "../controller/logsController";
import { authenticate } from "../middlewares/authenticate";

const logsRouter = Router();

logsRouter.get("/logs", authenticate, logsData);

export default logsRouter;
