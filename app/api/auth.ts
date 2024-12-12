import { jwtDecode } from "jwt-decode";
import apiClient, { getFailedResponse, processResponse } from "./client";

const endpoint = "/auth";

const decode = (jwt: string) => jwtDecode(jwt);

const login = async (email: string, password: string) => {
  try {
    return processResponse(await apiClient.post(endpoint, { email, password }));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { decode, login };
