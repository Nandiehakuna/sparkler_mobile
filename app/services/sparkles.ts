import { getFailedResponse, processResponse } from "./client";
import client from "./client";

const endpoint = "/sparkles";

const deleteSparkle = async (sparkleId: string) => {
  try {
    return processResponse(await client.delete(`${endpoint}/${sparkleId}`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { deleteSparkle };
