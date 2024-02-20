"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logsData = void 0;
const readLastLines = __importStar(require("read-last-lines"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
function logsData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logPath = path_1.default.resolve(__dirname, "../../logs/combined.log");
            const rawLogs = yield readLastLines.read(logPath, 10000000000);
            const logLines = rawLogs.split("\n").filter(Boolean);
            const logsPerPage = req.query.pageSize
                ? parseInt(req.query.pageSize)
                : 100;
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const offset = (page - 1) * logsPerPage;
            const logs = logLines
                .slice(offset, offset + logsPerPage)
                .map((logLine) => {
                try {
                    return JSON.parse(logLine);
                }
                catch (error) {
                    logger_1.default.error(`Error parsing log line: ${logLine}. Error: ${error.message}`);
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
        }
        catch (error) {
            logger_1.default.error(`Error while fetching logs: ${error.message}`);
            res.status(500).json({ message: "An error occurred while fetching logs" });
        }
    });
}
exports.logsData = logsData;
