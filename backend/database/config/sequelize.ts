import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST_NAME,
  port: 5432,
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string,
  dialect: "postgres",
  // schema: schema ?? "public",
});

const sequelizePublic = new Sequelize({
  host: process.env.DB_HOST_NAME,
  port: 5432,
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string,
  dialect: "postgres",
});
export { sequelize, sequelizePublic };
