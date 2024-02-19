"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Visitor extends sequelize_1.Model {
}
Visitor.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userAgent: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    modelName: "Visitors",
});
exports.default = Visitor;
