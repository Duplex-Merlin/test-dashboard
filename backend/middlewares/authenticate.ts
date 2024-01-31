import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, config.jwtSecret!, (err, decoded) => {
        if (err) {
          res.send({ message: "Unauthorized" });
        }
        //@ts-ignore
        req.user = { userId: decoded.userId };
        next();
      });
    } catch (error) {
      res.json({ message: "Token invalide" });
    }
  } else {
    res.json({ message: "Missing Token" });
  }
}
