import { Request, Response } from "express";
import fs from "fs-extra";

import Article from "../database/entities/article.entity";
import User from "../database/entities/user.entity";
import logger from "../utils/logger";
import Visitor from "../database/entities/visitor.entity";
import { Op, col, fn, literal } from "sequelize";
import { isEmpty } from "lodash";
import { CustomRequest } from "../contant/contants";

export async function countDashboard(req: CustomRequest, res: Response) {
  try {
    // const ArticleWithTenant = initModelWithSchema(Article, req.tenantId!);
    const news = await Article.schema(req.tenantId!).count();
    const users = (await User.schema(req.tenantId!).count()) - 1;
    const visotors = await Visitor.schema(req.tenantId!).count();

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

export async function trackVisit(req: CustomRequest, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingVisit = await Visitor.schema(req.tenantId!).findOne({
      where: { ipAddress: req.ip, timestamp: { [Op.gte]: today } },
    });

    if (!existingVisit) {
      await Visitor.schema(req.tenantId!).create({
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

export async function getDailyStats(req: CustomRequest, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the first day of the week
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());

    // Get the last day of the week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const stats = await Visitor.schema(req.tenantId!).findAll({
      attributes: [
        [literal("DATE_TRUNC('day', date)"), "day"],
        [literal("COUNT(id)"), "count"],
      ],
      where: {
        date: {
          [Op.between]: [firstDayOfWeek, lastDayOfWeek],
        },
      },
      group: [
        //@ts-ignore
        literal("DATE_TRUNC('day', date)"),
      ],
      order: [literal("DATE_TRUNC('day', date) ASC")],
    });

    const transformedStats = stats.map((stat: any) => {
      return {
        day: new Date(stat.dataValues.day).toLocaleString("default", {
          weekday: "long",
        }),
        count: stat.dataValues.count,
      };
    });

    res.json(transformedStats);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getMonthlyStats(req: CustomRequest, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await Visitor.schema(req.tenantId!).findAll({
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

export async function createArticle(req: CustomRequest, res: Response) {
  try {
    const { title, description, status, content } = req.body;
    //@ts-ignore
    const { filename } = req.file;
    const article = await Article.schema(req.tenantId!).create({
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
    console.log(error);
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function getAllArticle(req: CustomRequest, res: Response) {
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

    const articles = await Article.schema(req.tenantId!).findAll({
      ...attributes,
    });
    const count = await Article.schema(req.tenantId!).count();
    const totalPages = Math.ceil(count / pageSize);

    logger.info(`Get all l successfully!. Requested by: ${req.ip}`);
    res.json({
      data: articles,
      page,
      pageSize: pageSize,
      totalResults: articles.length,
      totalPages,
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

export async function updateArticle(req: CustomRequest, res: Response) {
  try {
    const { title, description, status, content } = req.body;
    const { id } = req.params;

    if (req.file) {
      //@ts-ignore
      const { filename } = req.file;
      const article = await Article.schema(req.tenantId!).findByPk(id);

      if (!article) {
        logger.warn(`Article not found!. Requested by: ${req.ip}`);
        return res.status(404).json({ message: "Article not found" });
      }

      const imagePath = `uploads/${req.tenantId!}/${article.coverPicture}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      const articleUpdate = await Article.schema(req.tenantId!).update(
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

    const articleUpdate = await Article.schema(req.tenantId!).update(
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

export async function updateStatusArticle(req: CustomRequest, res: Response) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    await Article.schema(req.tenantId!).update({ status }, { where: { id } });
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

export async function deleteArticle(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;
    const article = await Article.schema(req.tenantId!).findByPk(id);

    if (!article) {
      logger.warn(`Article not found. Requested by: ${req.ip}`);
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.coverPicture) {
      const imagePath = `uploads/${req.tenantId!}/${article.coverPicture}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Article.schema(req.tenantId!).destroy({ where: { id } });
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
