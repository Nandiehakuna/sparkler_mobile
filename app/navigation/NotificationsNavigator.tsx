import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ActivityActor } from '../utils/types';
import { HeaderLeftBackIcon } from '../components/header';
import { ThreadHeader } from '../components/thread';
import {
  MentionsNotificationsScreen,
  NotificationsScreen,
  ProfileScreen,
  ThreadScreen,
} from '../screens';
import routes from './routes';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const NotificationsTabNavigator = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen
      name={routes.NOTIFICATIONS}
      component={NotificationsScreen}
      options={{ title: 'All' }}
    />
    <Tab.Screen
      name={routes.MENTIONS_NOTIFICATIONS}
      component={MentionsNotificationsScreen}
      options={{ title: 'Mentions' }}
    />
  </Tab.Navigator>
);

export default () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.NOTIFICATIONS_TABS} component={NotificationsTabNavigator} />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: 'slide_from_right',
          headerTitle: () => <ThreadHeader />,
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          headerTitle: () => <ThreadHeader label={(route.params as ActivityActor)?.data?.name} />,
          animation: 'slide_from_bottom',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderLeftBackIcon />,
        })}
      />
    </Stack.Navigator>
  );
};
