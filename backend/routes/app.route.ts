import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  signup,
  updateUser,
} from "../controller/auth.controller";
import {
  countDashboard,
  createArticle,
  deleteArticle,
  getAllArticle,
  getDailyStats,
  getMonthlyStats,
  trackVisit,
  updateArticle,
  updateStatusArticle,
} from "../controller/article.controller";
import { upload } from "../utils/upload-file";
import { verifyRequest } from "../middlewares/verify.request";

const appRouter = Router();

appRouter.get("/track-visit", verifyRequest, trackVisit);
appRouter.get("/get-daily-stats", verifyRequest, authenticate, getDailyStats);
appRouter.get("/get-month-stats", verifyRequest, authenticate, getMonthlyStats);
appRouter.get("/dasboard", verifyRequest, authenticate, countDashboard);

appRouter.get("/users", verifyRequest, authenticate, getAllUsers);
appRouter.post("/user/create", verifyRequest, authenticate, signup);
appRouter.patch(
  "/user/:id/password-update",
  verifyRequest,
  authenticate,
  changePassword
);
appRouter.patch("/user/:id/update", verifyRequest, authenticate, updateUser);
appRouter.delete("/user/:id/delete", verifyRequest, authenticate, deleteUser);

appRouter.get("/articles", verifyRequest, authenticate, getAllArticle);
appRouter.post(
  "/create-article",
  verifyRequest,
  authenticate,
  upload.single("coverPicture"),
  createArticle
);
appRouter.patch(
  "/article/:id/update",
  verifyRequest,
  authenticate,
  upload.single("coverPicture"),
  updateArticle
);
appRouter.patch(
  "/article/:id/update-status",
  verifyRequest,
  authenticate,
  updateStatusArticle
);

appRouter.delete(
  "/article/:id/delete",
  verifyRequest,
  authenticate,
  deleteArticle
);

export default appRouter;
