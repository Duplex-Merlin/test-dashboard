import { LoginRequest } from "../entities";
import { axiospost, post } from "../interceptor/api.interceptor";

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/auth/login", body);
  return await res.json();
};

export const createArticle = async (data: any) => {
  const res = await axiospost("/create-article", data);
  return res;
};
