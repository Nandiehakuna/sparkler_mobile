import { getFailedResponse, processResponse } from './client';
import client from './client';

const endpoint = '/reactions';

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

interface ToggleReactionProps extends Reaction {
  done: boolean;
}

const toggle = async (data: ToggleReactionProps) => {
  try {
    return processResponse(await client.post(`${endpoint}/toggle`, data));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const remove = async (data: { kind: string; sparklerId: string }) => {
  try {
    return processResponse(await client.post(`${endpoint}/remove`, data));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const get = async (kind: string) => {
  try {
    return processResponse(await client.get(`${endpoint}/${kind}`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { add, get, remove, toggle };
