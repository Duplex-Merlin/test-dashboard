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

appRouter.get("/track-visit", verifyMiddleware, trackVisit);
appRouter.get(
  "/get-daily-stats",
  verifyMiddleware,
  authenticateMiddleware,
  getDailyStats
);
appRouter.get(
  "/get-month-stats",
  verifyMiddleware,
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

appRouter.get("/users", verifyMiddleware, authenticateMiddleware, getAllUsers);
appRouter.post(
  "/user/create",
  verifyMiddleware,
  authenticateMiddleware,
  signup
);
appRouter.patch(
  "/user/:id/password-update",
  verifyMiddleware,
  authenticateMiddleware,
  changePassword
);
appRouter.patch(
  "/user/:id/update",
  verifyMiddleware,
  authenticateMiddleware,
  updateUser
);
appRouter.delete(
  "/user/:id/delete",
  verifyMiddleware,
  authenticateMiddleware,
  deleteUser
);

appRouter.get(
  "/articles",
  verifyMiddleware,
  authenticateMiddleware,
  getAllArticle
);
appRouter.post(
  "/create-article",
  verifyMiddleware,
  authenticateMiddleware,
  upload.single("coverPicture"),
  createArticle
);
appRouter.patch(
  "/article/:id/update",
  verifyMiddleware,
  authenticateMiddleware,
  upload.single("coverPicture"),
  updateArticle
);
appRouter.patch(
  "/article/:id/update-status",
  verifyMiddleware,
  authenticateMiddleware,
  updateStatusArticle
);

appRouter.delete(
  "/article/:id/delete",
  verifyMiddleware,
  authenticateMiddleware,
  deleteArticle
);

export default appRouter;
