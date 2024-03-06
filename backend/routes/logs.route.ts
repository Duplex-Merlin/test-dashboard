import { Router } from "express";
import { logsData } from "../controller/logsController";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware";
import { verifyMiddleware } from "../middlewares/verify.middleware";

const logsRouter = Router();

logsRouter.get("/logs", verifyMiddleware, authenticateMiddleware, logsData);

export default logsRouter;
