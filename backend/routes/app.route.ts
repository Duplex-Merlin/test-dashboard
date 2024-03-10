import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware";
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
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { TenantMiddelware } from "../middlewares/tenant.middleware";

const appRouter = Router();

appRouter.get("/track-visit", verifyMiddleware, TenantMiddelware, trackVisit);
appRouter.get(
  "/get-daily-stats",
  // verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  getDailyStats
);
appRouter.get(
  "/get-month-stats",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  getMonthlyStats
);
appRouter.get(
  "/dasboard",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  countDashboard
);

appRouter.get(
  "/users",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  getAllUsers
);
appRouter.post(
  "/user/create",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  signup
);
appRouter.patch(
  "/user/:id/password-update",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  changePassword
);
appRouter.patch(
  "/user/:id/update",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  updateUser
);
appRouter.delete(
  "/user/:id/delete",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  deleteUser
);

appRouter.get(
  "/articles",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  getAllArticle
);
appRouter.post(
  "/create-article",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  upload.single("coverPicture"),
  createArticle
);
appRouter.patch(
  "/article/:id/update",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  upload.single("coverPicture"),
  updateArticle
);
appRouter.patch(
  "/article/:id/update-status",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  updateStatusArticle
);

appRouter.delete(
  "/article/:id/delete",
  verifyMiddleware,
  TenantMiddelware,
  authenticateMiddleware,
  deleteArticle
);

export default appRouter;
