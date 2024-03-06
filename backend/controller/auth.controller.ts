import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../utils/config";
import User, { UserRole } from "../database/entities/user.entity";
import logger from "../utils/logger";
import { isEmpty } from "lodash";
import dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  tenantId?: string;
}
export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, role, username } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn(`This user already exists. Requested by: ${req.ip}`);
      res.status(400).json({ message: "This user already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      role: role as UserRole,
      password: hashedPassword,
    });

    const data = newUser.toJSON();
    delete data.password;
    logger.info(`User created successfully. Requested by: ${req.ip}`);
    res.status(201).json({ message: "User created successfully!", data });
  } catch (error) {
    logger.error(
      `Error for create user. Requested by: ${req.ip} message:An error occurred while registering`
    );
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function login(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.schema(req.tenantId!).findOne({
      where: { email },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.warn(
        `Error for verify user password. Requested by: ${req.ip} message: Incorrect password`
      );
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    const currentDate = new Date();

    await User.update(
      { lastLogin: currentDate.toString() },
      { where: { id: user.id } }
    );

    const token = generateToken(user.id, user.role);
    const userInfo = user.toJSON();
    delete userInfo.password;
    delete userInfo.role;
    logger.info(`Successful connection. Requested by: ${req.ip}`);
    res.json({
      message: "Successful connection",
      data: { user: userInfo, token },
    });
  } catch (error) {
    console.error(error);
    logger.error(
      `Error for change password user Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

function generateToken(userId: string, userRole: string): string {
  return jwt.sign({ userId, role: userRole }, config.jwtSecret!, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      logger.warn(`User not found. Requested by: ${req.ip}`);
      res.status(401).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      logger.info(`Current password no match. Requested by: ${req.ip}`);
      res.status(401).json({ message: "Current password no match" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id } });
    logger.info(
      `The password was changed successfully. Requested by: ${req.ip}`
    );
    res.json({ status: 200, message: "The password was changed successfully" });
  } catch (error) {
    logger.error(
      `Error for change password user Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    var page = req.query.page ? parseInt(req.query.page as string) : 1;

    var pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 10;

    let query = {};
    if (!isEmpty(req.query.pageSize)) {
      query = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      };
    }
    let attributes: Record<string, any> = {};
    attributes = {
      where: {},
      ...query,
      // order: [['publishedAt', 'DESC']]
    };

    const users = await User.findAll({
      attributes: { exclude: ["password"], ...attributes },
    });
    const count = await User.count();
    const totalPages = Math.ceil(count / pageSize);
    const customUsersList = users.filter(
      (user) => user.email != "account@alpha.com"
    );
    logger.info(`Successfully get all users list. Requested by: ${req.ip}`);
    res.json({
      data: customUsersList,
      page,
      pageSize: pageSize,
      totalResults: customUsersList.length,
      totalPages,
    });
  } catch (error) {
    logger.error(
      `Error for get all users list  Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { email, username } = req.body;
    const { id } = req.params;
    await User.update({ email, username }, { where: { id } });
    logger.info(`Update user successfully.... Requested by: ${req.ip}`);
    res.json({
      message: "Update successfully...",
      data: { id, email, username },
    });
  } catch (error) {
    logger.error(
      `Error for update user Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({
      message: "Delete successfully...",
      data: { id },
    });
    logger.info(`Delete user successfully... Requested by: ${req.ip}`);
  } catch (error) {
    logger.error(
      `Error for delete user Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});
