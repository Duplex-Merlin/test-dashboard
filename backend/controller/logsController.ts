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

    const logsPerPage = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 10;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const offset = (page - 1) * logsPerPage;

    const logs: LogObject[] = logLines
      .slice(offset, offset + logsPerPage)
      .map((logLine: string) => {
        try {
          return JSON.parse(logLine) as LogObject;
        } catch (error) {
          logger.error(
            `Error parsing log line: ${logLine}. Error: ${
              (error as any).message
            }`
          );
          return {
            level: "error",
            message: "Invalid log format",
            timestamp: new Date().toISOString(),
          };
        }
      });

    // Obtenir le nombre total de logs pour la pagination
    const totalLogs = logLines.length;
    const totalPages = Math.ceil(totalLogs / logsPerPage);

    res.json({
      logs: logs.reverse(),
      page,
      pageSize: logsPerPage,
      totalResults: logs.length,
      totalPages,
    });
  } catch (error) {
    logger.error(`Error while fetching logs: ${(error as any).message}`);
    res.status(500).json({ message: "An error occurred while fetching logs" });
  }
}
