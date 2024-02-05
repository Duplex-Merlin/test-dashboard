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
exports.deleteArticle = exports.updateStatusArticle = exports.updateArticle = exports.getAllArticle = exports.createArticle = exports.countDashboard = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const article_entity_1 = __importDefault(require("../database/entities/article.entity"));
const user_entity_1 = __importDefault(require("../database/entities/user.entity"));
const logger_1 = __importDefault(require("../utils/logger"));
function countDashboard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const news = yield article_entity_1.default.count();
            const users = yield user_entity_1.default.count();
            res.json({ data: [news, 0, 0, users] });
        }
        catch (error) {
            logger_1.default.error(`An error occurred while registering. Requested by: ${req.ip} message: ${error.message}`);
            res.status(500).json({ message: "An error occurred while registering" });
        }
    });
}
exports.countDashboard = countDashboard;
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
            const articles = yield article_entity_1.default.findAll();
            logger_1.default.info(`Get all l successfully!. Requested by: ${req.ip}`);
            res.json({ data: articles });
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
