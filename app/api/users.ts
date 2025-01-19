import { RegistrationInfo as UserInfo } from '../screens/RegisterScreen';
import { emptyResponse, getFailedResponse, processResponse, ResponseError } from './client';
import client from './client';

const endpoint = '/users';

const getAllUsers = async () => {
  try {
    return processResponse(await client.get(endpoint));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || 'Unknown error',
    };
  }
};

const getUserFollowersAndFollowingCount = async (userId: string) => {
  try {
    return processResponse(await client.get(`${endpoint}/userFollowings/${userId}`));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || 'Unknown error',
    };
  }
};

const getUserSparkles = async (userId: string) => {
  try {
    return processResponse(await client.get(`${endpoint}/${userId}/sparkles`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const getUserFollowers = async (userId: string) => {
  try {
    return processResponse(await client.get(`${endpoint}/${userId}/followers`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const getUserFollowing = async (userId: string) => {
  try {
    return processResponse(await client.get(`${endpoint}/${userId}/following`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const update = async (userInfo: object) => {
  try {
    return processResponse(await client.patch(endpoint, userInfo));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const quickAuth = (info: { email: string; profileImage: string; name: string }) =>
  client.post(`${endpoint}/quick`, info);

const register = async (userInfo: UserInfo) => {
  try {
    return processResponse(await client.post(endpoint, userInfo));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const followUser = async (data: { action: string; userId: string }) => {
  try {
    return processResponse(await client.post(`${endpoint}/follow`, data));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default {
  followUser,
  getAllUsers,
  getUserFollowing,
  getUserFollowers,
  getUserFollowersAndFollowingCount,
  getUserSparkles,
  register,
  update,
  quickAuth,
};
