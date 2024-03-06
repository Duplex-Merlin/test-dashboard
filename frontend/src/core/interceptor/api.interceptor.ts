import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { BEARER_TOKEN } from "../entities/contant";
import { getHostName, getTenant } from "../../utils/common";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const X_TENANT_ID = getTenant();
const HOSTNAME = getHostName();

interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
}

async function request(
  url: string,
  method: string,
  options?: RequestOptions
): Promise<Response> {
  const TOKEN = Cookies.get(BEARER_TOKEN);

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${TOKEN}`,
    "x-api-key": API_KEY,
    "X-Tenant-Id": X_TENANT_ID,
    "X-Customer-Hostname": HOSTNAME,

    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method,
    headers: headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  };

  return await fetch(url, config);
}

export async function post(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<Response> {
  return request(BASE_URL + url, "POST", {
    ...options,
    body: data,
  });
}

export async function get(
  url: string,
  options?: RequestOptions
): Promise<Response> {
  return request(BASE_URL + url, "GET", options);
}

export async function del(
  url: string,
  options?: RequestOptions
): Promise<Response> {
  return request(BASE_URL + url, "DELETE", options);
}

export async function patch(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<Response> {
  return request(BASE_URL + url, "PATCH", {
    ...options,
    body: data,
  });
}

export async function axiospost(
  url: string,
  body?: any
): Promise<AxiosResponse> {
  const TOKEN = Cookies.get(BEARER_TOKEN);

  return await axios.post(BASE_URL + url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
      "x-api-key": API_KEY,
    },
  });
}
