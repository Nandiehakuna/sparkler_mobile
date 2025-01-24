import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

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
      if (Platform.OS === 'android')
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#ff231f7c',
        });

      if (!Device.isDevice) return;

      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) return;

      const projectId: string | undefined = Constants?.expoConfig?.extra?.eas?.projectId;
      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      if (!user?.expoPushToken || user?.expoPushToken?.data !== token.data)
        expoPushTokensApi.register(token);
    } catch (error) {
      console.log('Error getting a push token', error);
    }
  };
};
