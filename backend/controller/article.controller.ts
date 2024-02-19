import { Request, Response } from "express";
import fs from "fs-extra";

import Article from "../database/entities/article.entity";
import User from "../database/entities/user.entity";
import logger from "../utils/logger";
import Visitor from "../database/entities/visitor.entity";
import { Op, col, fn } from "sequelize";
import { isEmpty } from "lodash";

export async function countDashboard(req: Request, res: Response) {
  try {
    const news = await Article.count();
    const users = await User.count();
    const visotors = await Visitor.count();

    res.json({ data: [news, visotors, 0, users] });
  } catch (error) {
    logger.error(
      `An error occurred while registering. Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function trackVisit(req: Request, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingVisit = await Visitor.findOne({
      where: { ipAddress: req.ip, timestamp: { [Op.gte]: today } },
    });

    if (!existingVisit) {
      await Visitor.create({
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
        timestamp: new Date(),
        date: today,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getDailyStats(req: Request, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await Visitor.findAll({
      attributes: [
        [fn("DATE_TRUNC", "day", col("date")), "day"],
        [fn("COUNT", col("id")), "count"],
      ],
      where: { date: { [Op.gte]: today } },
      group: [fn("DATE_TRUNC", "day", col("date"))],
      order: [[fn("DATE_TRUNC", "day", col("date")), "ASC"]],
    });

    const transformedStats = stats.map((stat) => {
      return {
        day: new Date(stat.dataValues.day).toLocaleString("default", {
          weekday: "long",
        }), // Change 'long' to 'short' for abbreviated month names
        count: stat.dataValues.count,
      };
    });

    res.json(transformedStats);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getMonthlyStats(req: Request, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await Visitor.findAll({
      attributes: [
        [fn("DATE_TRUNC", "month", col("date")), "month"],
        [fn("COUNT", col("id")), "count"],
      ],
      where: {
        date: {
          [Op.gte]: new Date(today.getFullYear(), 0, 1),
        },
      },
      group: [fn("DATE_TRUNC", "month", col("date"))],
      order: [[fn("DATE_TRUNC", "month", col("date")), "ASC"]],
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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createArticle(req: Request, res: Response) {
  try {
    const { title, description, status, content } = req.body;
    //@ts-ignore
    const { filename } = req.file;
    const article = await Article.create({
      title,
      description,
      coverPicture: filename,
      status: true,
      content,
    });
    logger.info(`Article created successfully!. Requested by: ${req.ip}`);
    res
      .status(201)
      .json({ message: "Article created successfully!", data: article });
  } catch (error) {
    logger.error(
      `An error occurred while registering. Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function getAllArticle(req: Request, res: Response) {
  try {
    var page = req.query.page ? parseInt(req.query.page as string) : 1;

    var pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 10;

    let query = {};
    if (!isEmpty(req.query.pageSize)) {
      query = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      };
    }
    let attributes: Record<string, any> = {};
    attributes = {
      where: {},
      ...query,
      // order: [['publishedAt', 'DESC']]
    };

    const articles = await Article.findAll({ ...attributes });
    const count = await Article.count();
    const totalPages = Math.ceil(count / pageSize);

    logger.info(`Get all l successfully!. Requested by: ${req.ip}`);
    res.json({
      data: articles,
      page,
      pageSize: pageSize,
      totalResults: articles.length,
      totalPages
    });
  } catch (error) {
    logger.error(
      `An error occurred while registering. Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function updateArticle(req: Request, res: Response) {
  try {
    const { title, description, status, content } = req.body;
    const { id } = req.params;

    if (req.file) {
      //@ts-ignore
      const { filename } = req.file;
      const article = await Article.findByPk(id);

      if (!article) {
        logger.warn(`Article not found!. Requested by: ${req.ip}`);
        return res.status(404).json({ message: "Article not found" });
      }

      const imagePath = `uploads/${article.coverPicture}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      const articleUpdate = await Article.update(
        { title, description, coverPicture: filename, status, content },
        { where: { id }, returning: true }
      );
      logger.info(`Create article successfully!. Requested by: ${req.ip}`);
      res.json({
        message: "Update successfully...",
        data: articleUpdate[1],
      });
      return;
    }

    const articleUpdate = await Article.update(
      { title, description, status, content },
      { where: { id }, returning: true }
    );
    res.json({
      message: "Update successfully...",
      data: articleUpdate[1],
    });
    logger.info(`Update article successfully!. Requested by: ${req.ip}`);
  } catch (error) {
    logger.error(
      `An error occurred while registering. Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function updateStatusArticle(req: Request, res: Response) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    await Article.update({ status }, { where: { id } });
    logger.info(
      `Article status changed successfully!. Requested by: ${req.ip}`
    );
    res.json({
      message: "Status changed successfully...",
      data: { id, status },
    });
  } catch (error) {
    logger.error(
      `An error occurred while registering. Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function deleteArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      logger.warn(`Article not found. Requested by: ${req.ip}`);
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.coverPicture) {
      const imagePath = `uploads/${article.coverPicture}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Article.destroy({ where: { id } });
    logger.info(`Delete article successfully!. Requested by: ${req.ip}`);
    res.json({
      message: "Delete successfully...",
      data: { id },
    });
  } catch (error) {
    logger.error(
      `An error occurred while registering. Requested by: ${req.ip} message: ${
        (error as any).message
      }`
    );
    res.status(500).json({ message: "An error occurred while registering" });
  }
}
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});
