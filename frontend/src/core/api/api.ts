import { LoginRequest } from "../entities";
import {
  UpdateRequest,
  UserRequest,
  UserUpdateRequest,
} from "../entities/user";
import {
  axiospost,
  del,
  get,
  patch,
  post,
} from "../interceptor/api.interceptor";

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/auth/login", body);
  return await res.json();
};

export const getAllLogs = async () => {
  const res = await get("/logs");
  return (await res.json()).logs;
};

export const getAllUsers = async () => {
  const res = await get("/users");
  return (await res.json()).data;
};

export const createUser = async (body: UserRequest) => {
  const res = await post("/user/create", body);
  return await res.json();
};

export const updateUser = async (userId: string, body: UpdateRequest) => {
  const res = await patch(`/user/${userId}/update`, body);
  return await res.json();
};

export const deleteUser = async (userId: String) => {
  const res = await del(`/user/${userId}/delete`);
  return await res.json();
};

export const getAllArticles = async () => {
  const res = await get("/articles");
  return (await res.json()).data;
};

export const createArticle = async (data: any) => {
  const res = await axiospost("/create-article", data);
  return res;
};

export const deleteArticle = async (articleId: String) => {
  const res = await del(`/article/${articleId}/delete`);
  return await res.json();
};