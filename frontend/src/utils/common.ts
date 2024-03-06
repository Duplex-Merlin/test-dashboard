import Cookies from "js-cookie";
import { DateTime } from "luxon";
import {
  BEARER_TOKEN,
  HOSTNAME,
  LANG,
  TENANT_ID,
  USER_TOKEN,
} from "../core/entities/contant";
import { User, UserRole } from "../core/entities/user";
import { jwtDecode } from "jwt-decode";

export const currentUserFromCookies = (): User | null => {
  const userToken = Cookies.get(USER_TOKEN);
  const token = Cookies.get(BEARER_TOKEN);
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);
  let user = userToken ? (JSON.parse(userToken) as User) : null;
  if (user) {
    //@ts-ignore
    user.role = decoded.role;
  }
  return user;
};

export const currentLang = (): string => {
  const lang = Cookies.get(LANG)!;
  return lang;
};

export const getTenant = (): string => {
  const tenant = Cookies.get(TENANT_ID)!;
  return tenant;
};

export const getHostName = (): string => {
  const hoastName = Cookies.get(HOSTNAME)!;
  return hoastName;
};

export const removeUserFromCookies = () => {
  Cookies.remove(BEARER_TOKEN);
  Cookies.remove(USER_TOKEN);
  Cookies.remove(LANG);
  Cookies.remove(TENANT_ID);
  Cookies.remove(HOSTNAME);
};

export const parseDateWith = (inputDate: string): string => {
  const parsedDate = DateTime.fromJSDate(new Date(inputDate));

  return parsedDate.toFormat("dd, LLL y");
};

export const parseDateWithHour = (inputDate: string): string => {
  const parsedDate = DateTime.fromJSDate(new Date(inputDate));

  return parsedDate.toFormat("dd, LLL y HH:mm a");
};

export const isSuperAdmin = (role: string): boolean => {
  return role === UserRole.SuperAdmin;
};

export const valueAfterSlash = (path: string): string => {
  return path.split("/")[2];
};
