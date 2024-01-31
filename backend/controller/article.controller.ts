import { Request, Response } from "express";
import fs from "fs-extra";

import Article from "../database/entities/article.entity";
import User from "../database/entities/user.entity";

export async function countDashboard(req: Request, res: Response) {
  try {
    const news = await Article.count();
    const users = await User.count();
    res.json({ data: [news, 0, 0, users] });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while registering" });
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
    res.json({ message: "Article created successfully!", data: article });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function getAllArticle(req: Request, res: Response) {
  try {
    const articles = await Article.findAll();
    res.json({ data: articles });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function updateStatusArticle(req: Request, res: Response) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    await Article.update({ status }, { where: { id } });
    res.json({
      message: "Status changed successfully...",
      data: { id, status },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while connecting" });
  }
}

export async function deleteArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.coverPicture) {
      const imagePath = `uploads/${article.coverPicture}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Article.destroy({ where: { id } });
    res.json({
      message: "Delete successfully...",
      data: { id },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while registering" });
  }
}
