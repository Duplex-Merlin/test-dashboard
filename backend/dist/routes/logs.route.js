"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logsController_1 = require("../controller/logsController");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const verify_middleware_1 = require("../middlewares/verify.middleware");
const logsRouter = (0, express_1.Router)();
logsRouter.get("/logs", verify_middleware_1.verifyMiddleware, authenticate_middleware_1.authenticateMiddleware, logsController_1.logsData);
exports.default = logsRouter;
