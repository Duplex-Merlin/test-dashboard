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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.changePassword = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../utils/config"));
const user_entity_1 = __importDefault(require("../database/entities/user.entity"));
const logger_1 = __importDefault(require("../utils/logger"));
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, role, username } = req.body;
            const existingUser = yield user_entity_1.default.findOne({ where: { email } });
            if (existingUser) {
                logger_1.default.warn(`This user already exists. Requested by: ${req.ip}`);
                res.status(400).json({ message: "This user already exists" });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield user_entity_1.default.create({
                email,
                username,
                role: role,
                password: hashedPassword,
            });
            const data = newUser.toJSON();
            delete data.password;
            logger_1.default.info(`User created successfully. Requested by: ${req.ip}`);
            res.status(201).json({ message: "User created successfully!", data });
        }
        catch (error) {
            logger_1.default.error(`Error for create user. Requested by: ${req.ip} message:An error occurred while registering`);
            res.status(500).json({ message: "An error occurred while registering" });
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_entity_1.default.findOne({
                where: { email },
                attributes: { exclude: ["updatedAt", "createdAt"] },
            });
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                logger_1.default.warn(`Error for verify user password. Requested by: ${req.ip} message: Incorrect password`);
                res.status(401).json({ message: "Incorrect password" });
                return;
            }
            const currentDate = new Date();
            yield user_entity_1.default.update({ lastLogin: currentDate.toString() }, { where: { id: user.id } });
            const token = generateToken(user.id, user.role);
            const userInfo = user.toJSON();
            delete userInfo.password;
            delete userInfo.role;
            logger_1.default.info(`Successful connection. Requested by: ${req.ip}`);
            res.json({
                message: "Successful connection",
                data: { user: userInfo, token },
            });
        }
        catch (error) {
            console.error(error);
            logger_1.default.error(`Error for change password user Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.login = login;
function generateToken(userId, userRole) {
    return jsonwebtoken_1.default.sign({ userId, role: userRole }, config_1.default.jwtSecret, {
        expiresIn: "12h",
    });
}
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { currentPassword, newPassword } = req.body;
            const { id } = req.params;
            const user = yield user_entity_1.default.findOne({
                where: { id },
            });
            if (!user) {
                logger_1.default.warn(`User not found. Requested by: ${req.ip}`);
                res.status(401).json({ message: "User not found" });
                return;
            }
            const passwordMatch = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (!passwordMatch) {
                logger_1.default.info(`Current password no match. Requested by: ${req.ip}`);
                res.status(401).json({ message: "Current password no match" });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield user_entity_1.default.update({ password: hashedPassword }, { where: { id } });
            logger_1.default.info(`The password was changed successfully. Requested by: ${req.ip}`);
            res.json({ message: "The password was changed successfully" });
        }
        catch (error) {
            logger_1.default.error(`Error for change password user Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.changePassword = changePassword;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_entity_1.default.findAll({ attributes: { exclude: ["password"] } });
            logger_1.default.info(`Successfully get all users list. Requested by: ${req.ip}`);
            res.json({
                data: users.filter((user) => user.email != "account@alpha.com"),
            });
        }
        catch (error) {
            logger_1.default.error(`Error for get all users list  Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.getAllUsers = getAllUsers;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username } = req.body;
            const { id } = req.params;
            yield user_entity_1.default.update({ email, username }, { where: { id } });
            logger_1.default.info(`Update user successfully.... Requested by: ${req.ip}`);
            res.json({
                message: "Update successfully...",
                data: { id, email, username },
            });
        }
        catch (error) {
            logger_1.default.error(`Error for update user Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield user_entity_1.default.destroy({ where: { id } });
            res.json({
                message: "Delete successfully...",
                data: { id },
            });
            logger_1.default.info(`Delete user successfully... Requested by: ${req.ip}`);
        }
        catch (error) {
            logger_1.default.error(`Error for delete user Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.deleteUser = deleteUser;
process.on("uncaughtException", (error) => {
    logger_1.default.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});
