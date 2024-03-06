import { LoginRequest } from "../entities";
import {
  UpdateRequest,
  UserPasswordRequest,
  UserRequest,
} from "../entities/user";
import {
  axiospost,
  del,
  get,
  patch,
  post,
} from "../interceptor/api.interceptor";

export const findHosName = async (body: { hostname: string }) => {
  const res = await post("/auth/find/hostname", body);
  return await res.json();
};

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/auth/login", body);
  return await res.json();
};

export const getAllLogs = async (query?: string) => {
  const res = await get(`/logs${query}`);
  return await res.json();
};

export const getAllUsers = async (query?: string) => {
  const res = await get(`/users${query}`);
  return await res.json();
};

export const createUser = async (body: UserRequest) => {
  const res = await post("/user/create", body);
  return await res.json();
};

export const updateUser = async (userId: string, body: UpdateRequest) => {
  const res = await patch(`/user/${userId}/update`, body);
  return await res.json();
};

export const updateUserPassword = async (
  userId: string,
  password: UserPasswordRequest
) => {
  const res = await patch(`/user/${userId}/password-update`, password);
  return await res.json();
};

export const deleteUser = async (userId: String) => {
  const res = await del(`/user/${userId}/delete`);
  return await res.json();
};

export const getAllArticles = async (query?: string) => {
  const res = await get(`/articles${query}`);
  return await res.json();
};

export const createArticle = async (data: any) => {
  const res = await axiospost("/create-article", data);
  return res;
};

export const deleteArticle = async (articleId: String) => {
  const res = await del(`/article/${articleId}/delete`);
  return await res.json();
};

export const getStats = async () => {
  const res = await get("/dasboard");
  return (await res.json()).data;
};

export const getDayStats = async () => {
  const res = await get("/get-daily-stats");
  return await res.json();
};

export const getMonthStats = async () => {
  const res = await get("/get-month-stats");
  return await res.json();
};
