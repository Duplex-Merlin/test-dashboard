"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_1 = require("sequelize");
const article_entity_1 = require("./article.entity");
const sequelize_2 = require("../config/sequelize");
function Article(schema) {
    return article_entity_1.ArticleModel.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        coverPicture: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: true,
        sequelize: (0, sequelize_2.sequelize)(schema),
        modelName: "Articles",
    });
}
exports.Article = Article;
