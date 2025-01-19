import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import expoPushTokensApi from '../api/expoPushTokens';
import useUser from './useUser';

export default (notificationListener?: (event: Notifications.NotificationResponse) => void) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) registerForPushNotifications();

    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      if (!Device.isDevice) return;

      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) return;

      const token = await Notifications.getExpoPushTokenAsync();

      if (!user?.expoPushToken || user?.expoPushToken?.data !== token.data)
        expoPushTokensApi.register(token);
    } catch (error) {
      console.log('Error getting a push token', error);
    }
  };
};
