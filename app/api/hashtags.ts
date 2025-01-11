import { getFailedResponse, processResponse } from './client';
import client from './client';

const endpoint = '/hashtags';

const getVerifiedHashtags = async () => {
  try {
    return processResponse(await client.get(`${endpoint}/verified`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const getAllHashtags = async () => {
  try {
    return processResponse(await client.get(`${endpoint}/all`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { getVerifiedHashtags, getAllHashtags };
