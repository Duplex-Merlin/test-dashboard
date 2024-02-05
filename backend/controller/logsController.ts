import { Request, Response } from "express";
import Tail from "tail";
import * as readLastLines from "read-last-lines";
import path from "path";
import logger from "../utils/logger";

interface LogObject {
  level: string;
  message: string;
  timestamp: string;
}

export async function logsData(req: Request, res: Response) {
  try {
    const logPath = path.resolve(__dirname, "../../logs/combined.log");

    const rawLogs = await readLastLines.read(logPath, 10000000000);
    const logLines = rawLogs.split("\n").filter(Boolean);

    const logs: LogObject[] = logLines.map((logLine: string) => {
      try {
        return JSON.parse(logLine) as LogObject;
      } catch (error) {
        logger.error(
          `Error parsing log line: ${logLine}. Error: ${(error as any).message}`
        );
        return {
          level: "error",
          message: "Invalid log format",
          timestamp: new Date().toISOString(),
        };
      }
    });

    res.json({ logs: logs.reverse() });
  } catch (error) {
    logger.error(`Error while fetching logs: ${(error as any).message}`);
    res.status(500).json({ message: "An error occurred while fetching logs" });
  }
}
