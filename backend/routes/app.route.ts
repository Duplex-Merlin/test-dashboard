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
  updateArticle,
  updateStatusArticle,
} from "../controller/article.controller";
import { upload } from "../utils/upload-file";

const appRouter = Router();

appRouter.get("/dasboard", authenticate, countDashboard);

appRouter.get("/users", authenticate, getAllUsers);
appRouter.post("/user/create", authenticate, signup);
appRouter.patch("/user/:id/password-update", authenticate, changePassword);
appRouter.patch("/user/:id/update", authenticate, updateUser);
appRouter.delete("/user/:id/delete", authenticate, deleteUser);

appRouter.get("/articles", authenticate, getAllArticle);
appRouter.post(
  "/create-article",
  authenticate,
  upload.single("coverPicture"),
  createArticle
);
appRouter.patch(
  "/article/:id/update",
  authenticate,
  upload.single("coverPicture"),
  updateArticle
);
appRouter.patch(
  "/article/:id/update-status",
  authenticate,
  updateStatusArticle
);

appRouter.delete("/article/:id/delete", authenticate, deleteArticle);

export default appRouter;
