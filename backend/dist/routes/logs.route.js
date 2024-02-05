"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logsController_1 = require("../controller/logsController");
const authenticate_1 = require("../middlewares/authenticate");
const logsRouter = (0, express_1.Router)();
logsRouter.get("/logs", authenticate_1.authenticate, logsController_1.logsData);
exports.default = logsRouter;
