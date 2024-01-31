const { NlpManager } = require("node-nlp");
import { Request, Response } from "express";
import * as readline from "readline";
import { manager } from "../nlp";

export async function chatbotnld(req: Request, res: Response): Promise<void> {
  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message is required" });
  }

  manager
    .process("en", message)
    .then((response: any) => {
      //   console.log("Bot:", response);
      res.json({ response: response.answer });
    })
    .catch((error: any) => {
      console.error("Error processing message:", error);
      res.status(500).json({ error: "Error processing message" });
    });
}
