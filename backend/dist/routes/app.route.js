"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const auth_controller_1 = require("../controller/auth.controller");
const article_controller_1 = require("../controller/article.controller");
const upload_file_1 = require("../utils/upload-file");
const verify_middleware_1 = require("../middlewares/verify.middleware");
const tenant_middleware_1 = require("../middlewares/tenant.middleware");
const appRouter = (0, express_1.Router)();
appRouter.get("/track-visit", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, article_controller_1.trackVisit);
appRouter.get("/get-daily-stats", 
// verifyMiddleware,
tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, article_controller_1.getDailyStats);
appRouter.get("/get-month-stats", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, article_controller_1.getMonthlyStats);
appRouter.get("/dasboard", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, article_controller_1.countDashboard);
appRouter.get("/users", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, auth_controller_1.getAllUsers);
appRouter.post("/user/create", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, auth_controller_1.signup);
appRouter.patch("/user/:id/password-update", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, auth_controller_1.changePassword);
appRouter.patch("/user/:id/update", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, auth_controller_1.updateUser);
appRouter.delete("/user/:id/delete", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, auth_controller_1.deleteUser);
appRouter.get("/articles", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, article_controller_1.getAllArticle);
appRouter.post("/create-article", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, upload_file_1.upload.single("coverPicture"), article_controller_1.createArticle);
appRouter.patch("/article/:id/update", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, upload_file_1.upload.single("coverPicture"), article_controller_1.updateArticle);
appRouter.patch("/article/:id/update-status", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, article_controller_1.updateStatusArticle);
appRouter.delete("/article/:id/delete", verify_middleware_1.verifyMiddleware, tenant_middleware_1.TenantMiddelware, authenticate_middleware_1.authenticateMiddleware, article_controller_1.deleteArticle);
exports.default = appRouter;
