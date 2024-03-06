"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizePublic = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.DB_HOST_NAME,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    // schema: schema ?? "public",
});
exports.sequelize = sequelize;
const sequelizePublic = new sequelize_typescript_1.Sequelize({
    host: process.env.DB_HOST_NAME,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
});
exports.sequelizePublic = sequelizePublic;
