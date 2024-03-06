"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
function authenticateMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (err, decoded) => {
                if (err) {
                    res.send({ message: "Unauthorized" });
                }
                //@ts-ignore
                req.user = { userId: decoded.userId };
                next();
            });
        }
        catch (error) {
            res.json({ message: "Token invalide" });
        }
    }
    else {
        res.json({ message: "Missing Token" });
    }
}
exports.authenticateMiddleware = authenticateMiddleware;
