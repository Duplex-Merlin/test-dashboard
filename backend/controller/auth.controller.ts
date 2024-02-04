import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../utils/config";
import User, { UserRole } from "../database/entities/user.entity";

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, role, username } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
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

    res.status(201).json({ message: "User created successfully!", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
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

    res.json({
      message: "Successful connection",
      data: { user: userInfo, token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

function generateToken(userId: string, userRole: string): string {
  return jwt.sign({ userId, role: userRole }, config.jwtSecret!, {
    expiresIn: "12h",
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
      res.status(401).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Current password no match" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id } });
    res.json({ message: "The password was changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json({
      data: users.filter((user) => user.email != "account@alpha.com"),
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { email, username } = req.body;
    const { id } = req.params;
    await User.update({ email, username }, { where: { id } });
    res.json({
      message: "Update successfully...",
      data: { id, email, username },
    });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}
