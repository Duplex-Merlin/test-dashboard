"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class Customer extends sequelize_1.Model {
}
Customer.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
    },
    customerFirstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    customerLastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    customerEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    customerPhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    customerLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    customerWebsite: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    tenantId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hostName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: sequelize_2.sequelizePublic,
    modelName: "Customers",
});
exports.default = Customer;
