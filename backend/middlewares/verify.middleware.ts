import { NextFunction, Request, Response } from "express";

export async function verifyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let apiKey = null;

  apiKey = req.header("x-api-key");

  if (apiKey) {
    if (apiKey !== process.env.API_KEY) {
      res.status(400).send({
        status: "error",
        code: "apiError",
        message: "You cannot access this request.",
      });
    }
    next();
  } else {
    res.status(500).send({
      status: "error",
      code: "apiErrorV",
      message: "You must provide an API key",
    });
  }
}
