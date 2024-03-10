import { Request, Response, NextFunction } from "express";
import { URL } from "url";
import { sequelizePublic } from "../database/config/sequelize";
import {
  getCustomerByHostName,
  getCustomerByTenantId,
} from "../controller/tenant.controller";

interface CustomRequest extends Request {
  tenantId?: string;
}

export async function TenantMiddelware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const tenantId = req.headers["x-tenant-id"];
    // const xHostname = req.headers["x-customer-hostname"];
    // console.log();
    console.log(req.headers);
    const parsedUrl = new URL(req.headers["origin"]!);
    const xHostname = parsedUrl.hostname.split(".")[0];

    parsedUrl.hostname.split(".")[0];
    if (!xHostname) {
      res.status(406).send("You must fill in the Hostname");
    }

    if (!tenantId) {
      res.status(406).send("You must fill in the Tenant");
    }

    await sequelizePublic.authenticate();

    const hostname = await getCustomerByHostName(xHostname as string);

    if (!hostname) {
      return res.status(404).send("Hostname not found");
    }

    // find tenantId in table on database
    const tenant = await getCustomerByTenantId(tenantId as string);

    if (!tenant) {
      return res.status(404).send("Tenant not found");
    }

    req.tenantId = tenant.tenantId;

    // sequelize(req["tenantId"]).options.schema = req["tenantId"];

    next();
  } catch (error) {
    console.error("Error in TenantMiddleware:", error);
    return res.status(500).send("Internal Server Error");
  }
}
