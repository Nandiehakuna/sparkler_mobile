import axios, { AxiosResponse } from "axios";

import authStorage from "../auth/storage";

export const authTokenKey = "x-auth-token";
export const appUrl = "https://sparkler.lol";

export type ResponseError = {
  response: {
    data?: DataError;
  };
};

export interface DataError {
  error: string;
}

// baseURL: "https://campus-hub-api.onrender.com/api",
const apiClient = axios.create({
  baseURL: "https://campus-hub-api-production.up.railway.app/api",
});

apiClient.interceptors.request.use(async (config) => {
  const authToken = await authStorage.getToken();

  if (authToken && config.headers) {
    config.headers[authTokenKey] = authToken;
  }

  return config;
});

export interface Response {
  ok: boolean;
  data: unknown;
  problem: string;
}

export const emptyResponse: Response = {
  ok: false,
  data: [],
  problem: "",
};

export const processResponse = (res: AxiosResponse) => {
  const response: Response = {
    ok: false,
    data: [],
    problem: "",
  };

  if (!res) return response;

  const { data, status } = res;

  if (status >= 200 && status < 300) {
    response.ok = true;
    response.data = data;
  } else
    response.problem = (response?.data as DataError).error || "Unknown Error";

  return response;
};

export const getFailedResponse = (error: string): Response => ({
  ...emptyResponse,
  problem: error || "Unknown error",
});

export default apiClient;
