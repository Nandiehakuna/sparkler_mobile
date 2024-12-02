import { emptyResponse, processResponse, ResponseError } from "./client";
import client from "./client";

const endpoint = "/reactions";

interface ToggleReactionProps {
  done: boolean;
  actorId: string;
  kind: string;
  sparkleId: string;
}

const toggle = async (data: ToggleReactionProps) => {
  try {
    return processResponse(await client.post(`${endpoint}/toggle`, data));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || "Unknown error",
    };
  }
};

export default { toggle };
