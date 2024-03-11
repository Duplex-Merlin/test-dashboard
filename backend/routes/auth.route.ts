import { Router } from "express";
import { signup, login } from "../controller/auth.controller";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { findCustomerByHostName } from "../controller/tenant.controller";
import { TenantMiddelware } from "../middlewares/tenant.middleware";

const authRouter = Router();

authRouter.post("/find/hostname", verifyMiddleware, findCustomerByHostName);
authRouter.post("/login", verifyMiddleware, TenantMiddelware, login);

export default authRouter;
