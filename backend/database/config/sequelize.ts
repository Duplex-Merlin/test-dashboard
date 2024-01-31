import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  port: 5432,
  database: process.env.DATA_BASE as string,
  username: process.env.USER_NAME as string,
  password: process.env.PASSWORD as string,
  dialect: "postgres",
});

export default sequelize;
