"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app_route_1 = __importDefault(require("./routes/app.route"));
require("./utils/upload-file");
const logs_route_1 = __importDefault(require("./routes/logs.route"));
const path_1 = __importDefault(require("path"));
const tenant_route_1 = __importDefault(require("./routes/tenant.route"));
const tenant_middleware_1 = require("./middlewares/tenant.middleware");
// import chatBotRouter from "./routes/bot.route";
// import "./nld";
dotenv_1.default.config();
const app = (0, express_1.default)();
var corsOptions = {
    // origin: "http://localhost:8000",
    AccessControlAllowOrigin: "*",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/build")));
app.use(express_1.default.static("uploads"));
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use("/uploads", express_1.default.static("./uploads"));
app.get("/", tenant_middleware_1.TenantMiddelware, (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1", app_route_1.default);
app.use("/api/v1", logs_route_1.default);
app.use("/tenant", tenant_route_1.default);
// app.use("/bot", chatBotRouter);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
