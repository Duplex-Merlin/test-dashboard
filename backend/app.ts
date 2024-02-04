import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route";
import appRouter from "./routes/app.route";
import "./utils/upload-file";
// import chatBotRouter from "./routes/bot.route";
// import "./nld";

dotenv.config();

const app: Express = express();
var corsOptions = {
  // origin: "http://localhost:8000",
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(express.static("uploads"));

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/uploads", express.static("./uploads"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", appRouter);
// app.use("/bot", chatBotRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
