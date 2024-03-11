"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_middleware_1 = require("../middlewares/verify.middleware");
const tenant_controller_1 = require("../controller/tenant.controller");
const tenantRouter = (0, express_1.Router)();
tenantRouter.post("/customer", verify_middleware_1.verifyMiddleware, tenant_controller_1.createCustomer);
tenantRouter.get("/customers", verify_middleware_1.verifyMiddleware, tenant_controller_1.getCustomers);
tenantRouter.delete("/customer/:id/delete", verify_middleware_1.verifyMiddleware, tenant_controller_1.deleteCustomer);
exports.default = tenantRouter;
