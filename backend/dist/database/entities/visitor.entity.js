"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
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
    sequelize: sequelize_2.sequelize,
    modelName: "Visitors",
});
exports.default = Visitor;
