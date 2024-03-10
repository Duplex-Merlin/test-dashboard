import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { sequelizePublic } from "../database/config/sequelize";
import Customer from "../database/entities/customer.entity";
import { hostname } from "os";

export async function createCustomer(req: Request, res: Response) {
  try {
    const {
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhoneNumber,
      customerLocation,
      customerWebsite,
      profilePicture,
      hostName,
    } = req.body;

    const c = "abcdef0123456789";
    const tenantId = [...Array(32)]
      .map(() => c[~~(Math.random() * c.length)])
      .join("");

    const customer = await Customer.create({
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

    await sequelizePublic.authenticate();
    await sequelizePublic.createSchema(tenantId, {});
    res.json({ data: customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

export async function getCustomers(req: Request, res: Response) {
  const customers = await Customer.findAll();
  res.json({ data: customers });
}

export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params;
  const getCustomer = await Customer.findByPk(id);
  if (!getCustomer) {
    return res.status(404).json({ message: "Company not found." });
  }
  await Customer.destroy({
    where: { id: getCustomer.id },
  });
  await sequelizePublic.authenticate();
  await sequelizePublic.dropSchema(getCustomer.tenantId, {});

  res.json({
    message: `Tenant ${getCustomer.customerFirstName} ${getCustomer.customerLastName} has been deleted`,
  });
}

export async function findCustomerByHostName(req: Request, res: Response) {
  try {
    const { hostname } = req.body;

    const data = await Customer.findOne({
      where: { hostName: hostname },
    });
    if (!data) {
      return res.status(404).send({ message: "Company not found." });
    }

    res.json({ data: { tenantId: data?.tenantId, hosname: data?.hostName } });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
}

export async function getCustomerByTenantId(tenantId: string) {
  const data = await Customer.findOne({
    where: { tenantId },
  });

  return data;
}

export async function getCustomerByHostName(hostname: string) {
  const data = await Customer.findOne({
    where: { hostName: hostname },
  });

  return data;
}
