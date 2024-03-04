import { Router } from "express";
import { logsData } from "../controller/logsController";
import { authenticate } from "../middlewares/authenticate";
import { verifyRequest } from "../middlewares/verify.request";

const logsRouter = Router();

logsRouter.get("/logs", verifyRequest, authenticate, logsData);

export default logsRouter;
