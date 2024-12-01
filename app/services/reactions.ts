import { emptyResponse, processResponse, ResponseError } from "./client";
import client from "./client";

const endpoint = "/reactions";

interface Props {
  hasResparkled: boolean;
  actorId: string;
  kind: string;
  sparkleId: string;
}

const resparkle = async (data: Props) => {
  try {
    return processResponse(await client.post(`${endpoint}/resparkle`, data));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || "Unknown error",
    };
  }
};

export default { resparkle };
