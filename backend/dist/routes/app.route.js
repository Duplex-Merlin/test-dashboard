"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middlewares/authenticate");
const auth_controller_1 = require("../controller/auth.controller");
const article_controller_1 = require("../controller/article.controller");
const upload_file_1 = require("../utils/upload-file");
const verify_request_1 = require("../middlewares/verify.request");
const appRouter = (0, express_1.Router)();
appRouter.get("/track-visit", verify_request_1.verifyRequest, article_controller_1.trackVisit);
appRouter.get("/get-daily-stats", verify_request_1.verifyRequest, authenticate_1.authenticate, article_controller_1.getDailyStats);
appRouter.get("/get-month-stats", verify_request_1.verifyRequest, authenticate_1.authenticate, article_controller_1.getMonthlyStats);
appRouter.get("/dasboard", verify_request_1.verifyRequest, authenticate_1.authenticate, article_controller_1.countDashboard);
appRouter.get("/users", verify_request_1.verifyRequest, authenticate_1.authenticate, auth_controller_1.getAllUsers);
appRouter.post("/user/create", verify_request_1.verifyRequest, authenticate_1.authenticate, auth_controller_1.signup);
appRouter.patch("/user/:id/password-update", verify_request_1.verifyRequest, authenticate_1.authenticate, auth_controller_1.changePassword);
appRouter.patch("/user/:id/update", verify_request_1.verifyRequest, authenticate_1.authenticate, auth_controller_1.updateUser);
appRouter.delete("/user/:id/delete", verify_request_1.verifyRequest, authenticate_1.authenticate, auth_controller_1.deleteUser);
appRouter.get("/articles", verify_request_1.verifyRequest, authenticate_1.authenticate, article_controller_1.getAllArticle);
appRouter.post("/create-article", verify_request_1.verifyRequest, authenticate_1.authenticate, upload_file_1.upload.single("coverPicture"), article_controller_1.createArticle);
appRouter.patch("/article/:id/update", verify_request_1.verifyRequest, authenticate_1.authenticate, upload_file_1.upload.single("coverPicture"), article_controller_1.updateArticle);
appRouter.patch("/article/:id/update-status", verify_request_1.verifyRequest, authenticate_1.authenticate, article_controller_1.updateStatusArticle);
appRouter.delete("/article/:id/delete", verify_request_1.verifyRequest, authenticate_1.authenticate, article_controller_1.deleteArticle);
exports.default = appRouter;
