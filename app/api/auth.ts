import { jwtDecode } from 'jwt-decode';

import apiClient, { getFailedResponse, processResponse } from './client';

const endpoint = '/auth';

const decode = (jwt: string) => jwtDecode(jwt);

const login = async (email: string, authCode: number) => {
  try {
    return processResponse(await apiClient.post(endpoint, { email, authCode }));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const loginWithCode = async (email: string, authCode: number) => {
  try {
    return processResponse(
      await apiClient.post(`${endpoint}/verify-auth-code`, { email, authCode }),
    );
  } catch (error) {
    return getFailedResponse(error);
  }
};

const getAuthCode = async (email: string) => {
  try {
    return processResponse(await apiClient.post(`${endpoint}/code`, { email }));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { decode, getAuthCode, login, loginWithCode };
