import { ExpoPushToken } from 'expo-notifications';

import client from './client';

const register = (pushToken: ExpoPushToken) =>
  client.post('/expoPushTokens', { token: pushToken });

export default {
  register,
};
