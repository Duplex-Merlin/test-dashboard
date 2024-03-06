import { Router } from "express";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import {
  createCustomer,
  findCustomerByHostName,
  getCustomers,
} from "../controller/tenant.controller";

const tenantRouter = Router();

tenantRouter.post("/customer", verifyMiddleware, createCustomer);
tenantRouter.get("/customers", verifyMiddleware, getCustomers);
tenantRouter.post("/customer/:id/delete", verifyMiddleware, createCustomer);

export default tenantRouter;
