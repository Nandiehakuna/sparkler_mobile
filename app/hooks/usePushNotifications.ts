import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import expoPushTokensApi from '../api/expoPushTokens';
import useUser from './useUser';

export default (
  notificationListener?: (event: Notifications.NotificationResponse) => void,
) => {
  const { user } = useUser();

  useEffect(() => {
    if (user && !user.expoPushToken) registerForPushNotifications();

    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener,
      );
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      console.log('Error getting a push token', error);
    }
  };
};
