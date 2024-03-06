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
exports.deleteArticle = exports.updateStatusArticle = exports.updateArticle = exports.getAllArticle = exports.createArticle = exports.getMonthlyStats = exports.getDailyStats = exports.trackVisit = exports.countDashboard = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const article_entity_1 = __importDefault(require("../database/entities/article.entity"));
const user_entity_1 = __importDefault(require("../database/entities/user.entity"));
const logger_1 = __importDefault(require("../utils/logger"));
const visitor_entity_1 = __importDefault(require("../database/entities/visitor.entity"));
const sequelize_1 = require("sequelize");
const lodash_1 = require("lodash");
function countDashboard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const ArticleWithTenant = initModelWithSchema(Article, req.tenantId!);
            const news = yield article_entity_1.default.schema(req.tenantId).count();
            const users = (yield user_entity_1.default.schema(req.tenantId).count()) - 1;
            const visotors = yield visitor_entity_1.default.schema(req.tenantId).count();
            res.json({ data: [news, visotors, 0, users] });
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while registering" });
        }
    });
}
exports.countDashboard = countDashboard;
function trackVisit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const existingVisit = yield visitor_entity_1.default.findOne({
                where: { ipAddress: req.ip, timestamp: { [sequelize_1.Op.gte]: today } },
            });
            if (!existingVisit) {
                yield visitor_entity_1.default.create({
                    ipAddress: req.ip,
                    userAgent: req.get("User-Agent"),
                    timestamp: new Date(),
                    date: today,
                });
            }
            res.sendStatus(200);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}
exports.trackVisit = trackVisit;
function getDailyStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Get the first day of the week
            const firstDayOfWeek = new Date(today);
            firstDayOfWeek.setDate(today.getDate() - today.getDay());
            // Get the last day of the week
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
            const stats = yield visitor_entity_1.default.findAll({
                attributes: [
                    [(0, sequelize_1.literal)("DATE_TRUNC('day', date)"), "day"],
                    [(0, sequelize_1.literal)("COUNT(id)"), "count"],
                ],
                where: {
                    date: {
                        [sequelize_1.Op.between]: [firstDayOfWeek, lastDayOfWeek],
                    },
                },
                group: [
                    //@ts-ignore
                    (0, sequelize_1.literal)("DATE_TRUNC('day', date)"),
                ],
                order: [(0, sequelize_1.literal)("DATE_TRUNC('day', date) ASC")],
            });
            const transformedStats = stats.map((stat) => {
                return {
                    day: new Date(stat.dataValues.day).toLocaleString("default", {
                        weekday: "long",
                    }),
                    count: stat.dataValues.count,
                };
            });
            res.json(transformedStats);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}
exports.getDailyStats = getDailyStats;
function getMonthlyStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const stats = yield visitor_entity_1.default.findAll({
                attributes: [
                    [(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("date")), "month"],
                    [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("id")), "count"],
                ],
                where: {
                    date: {
                        [sequelize_1.Op.gte]: new Date(today.getFullYear(), 0, 1),
                    },
                },
                group: [(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("date"))],
                order: [[(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("date")), "ASC"]],
            });
            const transformedStats = stats.map((stat) => {
                return {
                    month: new Date(stat.dataValues.month).toLocaleString("default", {
                        month: "long",
                    }), // Change 'long' to 'short' for abbreviated month names
                    count: stat.dataValues.count,
                };
            });
            res.json(transformedStats);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}
exports.getMonthlyStats = getMonthlyStats;
function createArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, status, content } = req.body;
            //@ts-ignore
            const { filename } = req.file;
            const article = yield article_entity_1.default.create({
                title,
                description,
                coverPicture: filename,
                status: true,
                content,
            });
            logger_1.default.info(`Article created successfully!. Requested by: ${req.ip}`);
            res
                .status(201)
                .json({ message: "Article created successfully!", data: article });
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while registering" });
        }
    });
}
exports.createArticle = createArticle;
function getAllArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var page = req.query.page ? parseInt(req.query.page) : 1;
            var pageSize = req.query.pageSize
                ? parseInt(req.query.pageSize)
                : 10;
            let query = {};
            if (!(0, lodash_1.isEmpty)(req.query.pageSize)) {
                query = {
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                };
            }
            let attributes = {};
            attributes = Object.assign({ where: {} }, query);
            const articles = yield article_entity_1.default.findAll(Object.assign({}, attributes));
            const count = yield article_entity_1.default.count();
            const totalPages = Math.ceil(count / pageSize);
            logger_1.default.info(`Get all l successfully!. Requested by: ${req.ip}`);
            res.json({
                data: articles,
                page,
                pageSize: pageSize,
                totalResults: articles.length,
                totalPages,
            });
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while registering" });
        }
    });
}
exports.getAllArticle = getAllArticle;
function updateArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, status, content } = req.body;
            const { id } = req.params;
            if (req.file) {
                //@ts-ignore
                const { filename } = req.file;
                const article = yield article_entity_1.default.findByPk(id);
                if (!article) {
                    logger_1.default.warn(`Article not found!. Requested by: ${req.ip}`);
                    return res.status(404).json({ message: "Article not found" });
                }
                const imagePath = `uploads/${article.coverPicture}`;
                if (fs_extra_1.default.existsSync(imagePath)) {
                    fs_extra_1.default.unlinkSync(imagePath);
                }
                const articleUpdate = yield article_entity_1.default.update({ title, description, coverPicture: filename, status, content }, { where: { id }, returning: true });
                logger_1.default.info(`Create article successfully!. Requested by: ${req.ip}`);
                res.json({
                    message: "Update successfully...",
                    data: articleUpdate[1],
                });
                return;
            }
            const articleUpdate = yield article_entity_1.default.update({ title, description, status, content }, { where: { id }, returning: true });
            res.json({
                message: "Update successfully...",
                data: articleUpdate[1],
            });
            logger_1.default.info(`Update article successfully!. Requested by: ${req.ip}`);
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.updateArticle = updateArticle;
function updateStatusArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { status } = req.body;
            const { id } = req.params;
            yield article_entity_1.default.update({ status }, { where: { id } });
            logger_1.default.info(`Article status changed successfully!. Requested by: ${req.ip}`);
            res.json({
                message: "Status changed successfully...",
                data: { id, status },
            });
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while connecting" });
        }
    });
}
exports.updateStatusArticle = updateStatusArticle;
function deleteArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const article = yield article_entity_1.default.findByPk(id);
            if (!article) {
                logger_1.default.warn(`Article not found. Requested by: ${req.ip}`);
                return res.status(404).json({ message: "Article not found" });
            }
            if (article.coverPicture) {
                const imagePath = `uploads/${article.coverPicture}`;
                if (fs_extra_1.default.existsSync(imagePath)) {
                    fs_extra_1.default.unlinkSync(imagePath);
                }
            }
            yield article_entity_1.default.destroy({ where: { id } });
            logger_1.default.info(`Delete article successfully!. Requested by: ${req.ip}`);
            res.json({
                message: "Delete successfully...",
                data: { id },
            });
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while registering" });
        }
    });
}
exports.deleteArticle = deleteArticle;
process.on("uncaughtException", (error) => {
    logger_1.default.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});
