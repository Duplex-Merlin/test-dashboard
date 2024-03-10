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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantMiddelware = void 0;
const url_1 = require("url");
const sequelize_1 = require("../database/config/sequelize");
const tenant_controller_1 = require("../controller/tenant.controller");
function TenantMiddelware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tenantId = req.headers["x-tenant-id"];
            // const xHostname = req.headers["x-customer-hostname"];
            // console.log();
            console.log(req.headers);
            const parsedUrl = new url_1.URL(req.headers["origin"]);
            const xHostname = parsedUrl.hostname.split(".")[0];
            parsedUrl.hostname.split(".")[0];
            if (!xHostname) {
                res.status(406).send("You must fill in the Hostname");
            }
            if (!tenantId) {
                res.status(406).send("You must fill in the Tenant");
            }
            yield sequelize_1.sequelizePublic.authenticate();
            const hostname = yield (0, tenant_controller_1.getCustomerByHostName)(xHostname);
            if (!hostname) {
                return res.status(404).send("Hostname not found");
            }
            // find tenantId in table on database
            const tenant = yield (0, tenant_controller_1.getCustomerByTenantId)(tenantId);
            if (!tenant) {
                return res.status(404).send("Tenant not found");
            }
            req.tenantId = tenant.tenantId;
            // sequelize(req["tenantId"]).options.schema = req["tenantId"];
            next();
        }
        catch (error) {
            console.error("Error in TenantMiddleware:", error);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.TenantMiddelware = TenantMiddelware;
