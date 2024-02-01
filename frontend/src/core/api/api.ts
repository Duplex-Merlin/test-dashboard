import { LoginRequest } from "../entities";
import { post } from "../interceptor/api.interceptor";

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/auth/login", body);
  return await res.json();
};
