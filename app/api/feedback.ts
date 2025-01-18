import client, { getFailedResponse, processResponse } from './client';

const endpoint = '/feedback';

interface Feedback {
  message: string;
}

const saveFeedback = async (feedback: Feedback) => {
  try {
    return processResponse(await client.post(endpoint, feedback));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { saveFeedback };
