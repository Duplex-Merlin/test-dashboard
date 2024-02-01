"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.PG_HOST,
    port: 5432,
    database: process.env.DATA_BASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    dialect: "postgres",
});
exports.default = sequelize;
