"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerByHostName = exports.getCustomerByTenantId = exports.findCustomerByHostName = exports.deleteCustomer = exports.getCustomers = exports.createCustomer = void 0;
const sequelize_1 = require("../database/config/sequelize");
const customer_entity_1 = __importDefault(require("../database/entities/customer.entity"));
function createCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { customerFirstName, customerLastName, customerEmail, customerPhoneNumber, customerLocation, customerWebsite, profilePicture, hostName, } = req.body;
            const c = "abcdef0123456789";
            const tenantId = [...Array(32)]
                .map(() => c[~~(Math.random() * c.length)])
                .join("");
            const customer = yield customer_entity_1.default.create({
                customerFirstName,
                customerLastName,
                customerEmail,
                customerPhoneNumber,
                customerLocation,
                customerWebsite,
                profilePicture,
                hostName,
                tenantId,
            });
            yield sequelize_1.sequelizePublic.authenticate();
            yield sequelize_1.sequelizePublic.createSchema(tenantId, {});
            res.json({ data: customer });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    });
}
exports.createCustomer = createCustomer;
function getCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customers = yield customer_entity_1.default.findAll();
        res.json({ data: customers });
    });
}
exports.getCustomers = getCustomers;
function deleteCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const getCustomer = yield customer_entity_1.default.findByPk(id);
        if (!getCustomer) {
            return res.status(404).json({ message: "Company not found." });
        }
        yield customer_entity_1.default.destroy({
            where: { id: getCustomer.id },
        });
        yield sequelize_1.sequelizePublic.authenticate();
        yield sequelize_1.sequelizePublic.dropSchema(getCustomer.tenantId, {});
        res.json({
            message: `Tenant ${getCustomer.customerFirstName} ${getCustomer.customerLastName} has been deleted`,
        });
    });
}
exports.deleteCustomer = deleteCustomer;
function findCustomerByHostName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { hostname } = req.body;
            const data = yield customer_entity_1.default.findOne({
                where: { hostName: hostname },
            });
            if (!data) {
                return res.status(404).send({ message: "Company not found." });
            }
            res.json({ data: { tenantId: data === null || data === void 0 ? void 0 : data.tenantId, hosname: data === null || data === void 0 ? void 0 : data.hostName } });
        }
        catch (error) {
            return res.status(404).send({ message: error });
        }
    });
}
exports.findCustomerByHostName = findCustomerByHostName;
function getCustomerByTenantId(tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield customer_entity_1.default.findOne({
            where: { tenantId },
        });
        return data;
    });
}
exports.getCustomerByTenantId = getCustomerByTenantId;
function getCustomerByHostName(hostname) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield customer_entity_1.default.findOne({
            where: { hostName: hostname },
        });
        return data;
    });
}
exports.getCustomerByHostName = getCustomerByHostName;
