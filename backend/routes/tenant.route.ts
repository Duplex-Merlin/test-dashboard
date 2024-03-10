import { Router } from "express";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import {
  createCustomer,
  deleteCustomer,
  findCustomerByHostName,
  getCustomers,
} from "../controller/tenant.controller";

const tenantRouter = Router();

tenantRouter.post("/customer", verifyMiddleware, createCustomer);
tenantRouter.get("/customers", verifyMiddleware, getCustomers);
tenantRouter.delete("/customer/:id/delete", verifyMiddleware, deleteCustomer);

export default tenantRouter;
