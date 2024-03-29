export type actionsType = "add" | "edit";

export enum UserRole {
  SuperAdmin = "super_admin",
  Admin = "admin",
}

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
export interface UserPaginate {
  data: User[],
  page: number;
  pageSize: number;
  totalResults: number;
  totalPages: number
}

export interface UserRequest {
  email: string;
  username: string;
  role: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface UpdateRequest {
  email: string;
  username: string;
  role: string;
}

export interface DashboardCount {
  news: number;
  user: number;
}
export interface UserUpdateRequest {
  userId: string;
  userRequest: UpdateRequest;
}

export interface UserPasswordRequest {
  currentPassword: string;
  newPassword: string;
}
