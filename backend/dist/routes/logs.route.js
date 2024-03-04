"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logsController_1 = require("../controller/logsController");
const authenticate_1 = require("../middlewares/authenticate");
const verify_request_1 = require("../middlewares/verify.request");
const logsRouter = (0, express_1.Router)();
logsRouter.get("/logs", verify_request_1.verifyRequest, authenticate_1.authenticate, logsController_1.logsData);
exports.default = logsRouter;
