import client, { getFailedResponse, processResponse } from './client';

const endpoint = '/expoPushNotifications';

const send = async (data: { targetUsersId: string[]; message: string; title?: string }) => {
  try {
    return processResponse(await client.post(endpoint, data));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { send };
