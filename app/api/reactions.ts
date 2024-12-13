import {
  emptyResponse,
  getFailedResponse,
  processResponse,
  ResponseError,
} from "./client";
import client from "./client";

const endpoint = "/reactions";

type Reaction = {
  actorId: string;
  kind: string;
  sparkleId: string;
};

interface AddReactionProps extends Reaction {
  data?: object;
}

const add = async (data: AddReactionProps) => {
  try {
    return processResponse(await client.post(`${endpoint}/add`, data));
  } catch (error) {
    return getFailedResponse(error);
  }
};

interface ReactionProps extends Reaction {
  done: boolean;
}

const toggle = async (data: ReactionProps) => {
  try {
    return processResponse(await client.post(`${endpoint}/toggle`, data));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data?.error || "Unknown error",
    };
  }
};

export default { add, toggle };
