import { emptyResponse, processResponse, ResponseError } from "./client";
import client from "./client";

const endpoint = "/users";

const getAllUsers = async () => {
  try {
    return processResponse(await client.get(endpoint));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || "Unknown error",
    };
  }
};

const getUserFollowings = async (userId: string) => {
  try {
    return processResponse(
      await client.get(`${endpoint}/userFollowings/${userId}`)
    );
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || "Unknown error",
    };
  }
};

export default { getAllUsers, getUserFollowings };
