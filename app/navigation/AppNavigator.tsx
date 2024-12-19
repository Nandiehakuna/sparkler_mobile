import { useState } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { IconBadge } from 'expo-activity-feed';

import {
  AuthScreen,
  FollowersScreen,
  FollowingScreen,
  LoginScreen,
  RegisterScreen,
  ViewImageScreen,
} from '../screens';
import {
  BellIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  UserIcon,
} from '../components/icons';
import { ImagesContext } from '../contexts';
import { Screen } from '../components';
import { useUser } from '../hooks';
import ExploreNavigator from './ExploreNavigator';
import HomeNavigator from './HomeNavigator';
import MessagesScreen from '../screens/MessagesScreen';
import NotificationsNavigator from './NotificationsNavigator';
import ProfileNavigator from './ProfileNavigator';
import routes from './routes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppTabs = () => {
  const { user } = useUser();

  return (
    <Tab.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={routes.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <HomeIcon color={color} size={size} />
          ),
          title: 'Home',
        }}
      />
      <Tab.Screen
        name={routes.EXPLORE_NAVIGATOR}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <SearchIcon size={size} color={color} />
          ),
          title: 'Explore',
        }}
      />
      <Tab.Screen
        name={routes.NOTIFICATION_NAVIGATOR}
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View>
              <IconBadge feedGroup="notification" showNumber={10} />
              <BellIcon size={size} color={color} />
            </View>
          ),
          title: 'Notifications',
        }}
      />
      <Tab.Screen
        name={routes.MESSAGES_NAVIGATOR}
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MailIcon size={size} color={color} />
          ),
          title: 'Messages',
        }}
      />
      {user && (
        <Tab.Screen
          name={routes.PROFILE_NAVIGATOR}
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ size, color }) => (
              <UserIcon size={size} color={color} />
            ),
            title: 'Profile',
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <Screen>
      <ImagesContext.Provider value={{ images, setImages }}>
        <Stack.Navigator id={undefined}>
          <Stack.Screen
            name={routes.APP_TABS}
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={routes.AUTH}
            component={AuthScreen}
            options={{
              animation: 'scale_from_center',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={routes.LOGIN}
            component={LoginScreen}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name={routes.REGISTER}
            component={RegisterScreen}
            options={{
              headerShown: false,
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name={routes.FOLLOWERS}
            component={FollowersScreen}
            options={{ title: 'Followers', animation: 'slide_from_left' }}
          />
          <Stack.Screen
            name={routes.FOLLOWING}
            component={FollowingScreen}
            options={{ title: 'Following', animation: 'slide_from_left' }}
          />
          <Stack.Screen
            name={routes.VIEW_IMAGE}
            component={ViewImageScreen}
            options={{ animation: 'scale_from_center', headerShown: false }}
          />
        </Stack.Navigator>
      </ImagesContext.Provider>
    </Screen>
  );
};
