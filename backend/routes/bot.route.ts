import { Router } from "express";
import { chatbotnld } from "../controller/chatbot.controller";

const chatBotRouter = Router();

chatBotRouter.post("/chat", chatbotnld);

export default chatBotRouter;
