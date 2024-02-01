import { LoginRequest } from "../entities";
import { axiospost, get, post } from "../interceptor/api.interceptor";

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/auth/login", body);
  return await res.json();
};

export const getAllUsers = async () => {
  const res = await get("/users");
  return (await res.json()).data;
};

export const createArticle = async (data: any) => {
  const res = await axiospost("/create-article", data);
  return res;
};
