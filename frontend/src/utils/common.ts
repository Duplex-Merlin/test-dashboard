import Cookies from "js-cookie";
import { DateTime } from "luxon";
import { BEARER_TOKEN, USER_TOKEN } from "../core/entities/contant";
import { User } from "../core/entities/user";

export const currentUserFromCookies = (): User | null => {
  const userToken = Cookies.get(USER_TOKEN);
  const user = userToken ? (JSON.parse(userToken) as User) : null;
  return user;
};

export const removeUserFromCookies = () => {
  Cookies.remove(BEARER_TOKEN);
  Cookies.remove(USER_TOKEN);
};

export const parseDateWith = (inputDate: string): string => {
  const parsedDate = DateTime.fromJSDate(new Date(inputDate));

  return parsedDate.toFormat("dd, LLL y");
};

export const parseDateWithHour = (inputDate: string): string => {
  const parsedDate = DateTime.fromJSDate(new Date(inputDate));

  return parsedDate.toFormat("dd, LLL y HH:mm a");
};