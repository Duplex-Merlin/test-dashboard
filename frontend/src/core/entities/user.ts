export type actionsType = "add" | "edit";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  lastLogin: string;
  createdAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface UpdateResponse {
  id: string;
  email: string;
  username: string;
}

export interface DashboardCount {
  news: number;
  user: number;
}