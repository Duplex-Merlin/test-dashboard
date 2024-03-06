import { Router } from "express";
import { signup, login } from "../controller/auth.controller";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { findCustomerByHostName } from "../controller/tenant.controller";

const authRouter = Router();

authRouter.post("/find/hostname", verifyMiddleware, findCustomerByHostName);
authRouter.post("/login", verifyMiddleware, login);

export default authRouter;
