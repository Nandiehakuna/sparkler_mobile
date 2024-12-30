import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

import { ActivityActor } from '../utils/types';
import {
  MentionsNotificationsScreen,
  NotificationsScreen,
  ProfileScreen,
  ThreadScreen,
} from '../screens';
import { HeaderLeftBackIcon } from '../components/thread';
import { Text } from '../components';
import colors from '../config/colors';
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
      <Stack.Screen
        name={routes.NOTIFICATIONS_TABS}
        component={NotificationsTabNavigator}
      />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: 'slide_from_right',
          headerTitle: () => (
            <Text isBold style={[styles.logo, styles.title]}>
              Sparkle
            </Text>
          ),
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          title: (route.params as ActivityActor)?.data?.name,
          animation: 'slide_from_bottom',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderLeftBackIcon />,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: colors.dark,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
