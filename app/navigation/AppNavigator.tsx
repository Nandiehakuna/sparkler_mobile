import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconBadge } from 'expo-activity-feed';
import { ToastProvider } from 'react-native-toast-notifications';
import Icon from '@expo/vector-icons/MaterialIcons';

import { ActivityActor } from '../utils/types';
import {
  AuthScreen,
  BookmarksScreen,
  FollowersScreen,
  FollowingScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  ThemeSettingsScreen,
  ViewImageScreen,
  FeedbackScreen,
} from '../screens';
import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  UserIcon,
  FeedbackIcon,
} from '../components/icons';
import { ThreadHeader } from '../components/thread';
import { ImagesContext } from '../contexts';
import { Screen } from '../components';
import { usePushNotifications, useTheme, useUser } from '../hooks';
import colors from '../config/colors';
import DrawerContent from '../components/drawer/DrawerContent';
import ExploreNavigator from './ExploreNavigator';
import HomeNavigator from './HomeNavigator';
import MessagesScreen from '../screens/MessagesScreen';
import NotificationsNavigator from './NotificationsNavigator';
import routes from './routes';
import { HeaderLeftBackIcon } from '../components/header';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppTabs = () => {
  const { user } = useUser();

  return (
    <BottomTab.Navigator
      id={undefined}
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <BottomTab.Screen
        name={routes.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name={routes.EXPLORE_NAVIGATOR}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <SearchIcon size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={routes.NOTIFICATION_NAVIGATOR}
        component={user ? NotificationsNavigator : AuthScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View>
              <IconBadge feedGroup="notification" showNumber={10} />
              <BellIcon size={size} color={color} />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={routes.MESSAGES_NAVIGATOR}
        component={user ? MessagesScreen : AuthScreen}
        options={{
          tabBarIcon: ({ size, color }) => <MailIcon size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const AppDrawer = () => {
  const { currentTheme } = useTheme();
  const { user } = useUser();

  const getLightModeIconName = () => {
    if (currentTheme === 'dark') return 'nights-stay';

    if (currentTheme === 'dim') return 'brightness-6';

    return 'wb-sunny';
  };

  return (
    <Screen>
      <Drawer.Navigator
        id={undefined}
        initialRouteName={routes.APP_TABS}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: colors.blue,
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.black,
          drawerLabelStyle: styles.drawerLabel,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name={routes.APP_TABS}
          component={AppTabs}
          options={{
            drawerIcon: HomeIcon,
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name={routes.PROFILE}
          component={user ? ProfileScreen : AuthScreen}
          options={({ route }) => ({
            drawerIcon: UserIcon,
            drawerLabel: 'Profile',
            headerTitle: () => <ThreadHeader label={(route.params as ActivityActor)?.data?.name} />,
          })}
        />
        <Drawer.Screen
          name={routes.BOOKMARKS}
          component={user ? BookmarksScreen : AuthScreen}
          options={{
            drawerIcon: BookmarkIcon,
            drawerLabel: 'Bookmarks',
          }}
        />

        <Drawer.Screen
          name={routes.FEEDBACK}
          component={FeedbackScreen}
          options={{
            drawerIcon: ({ size, color }) => <FeedbackIcon size={size} color={color} />,
            drawerLabel: 'Feedback',
          }}
        />
        <Drawer.Screen
          name={routes.THEME_SETTINGS}
          component={ThemeSettingsScreen}
          options={{
            drawerIcon: (props) => <Icon name={getLightModeIconName()} {...props} />,
            drawerLabel: `${currentTheme} mode`,
          }}
        />
      </Drawer.Navigator>
    </Screen>
  );
};

export default () => {
  const [images, setImages] = useState<string[]>([]);
  const { theme } = useTheme();
  usePushNotifications();

  return (
    <ToastProvider>
      <ImagesContext.Provider value={{ images, setImages }}>
        <Stack.Navigator
          id={undefined}
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerTitleStyle: { color: theme.colors.text },
            cardStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen
            name={routes.APP_DRAWER}
            component={AppDrawer}
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
            options={{
              title: 'Followers',
              animation: 'slide_from_left',
              headerTitleAlign: 'center',
              headerLeft: HeaderLeftBackIcon,
            }}
          />
          <Stack.Screen
            name={routes.FOLLOWING}
            component={FollowingScreen}
            options={{
              title: 'Following',
              animation: 'slide_from_left',
              headerTitleAlign: 'center',
              headerLeft: HeaderLeftBackIcon,
            }}
          />
          <Stack.Screen
            name={routes.VIEW_IMAGE}
            component={ViewImageScreen}
            options={{ animation: 'scale_from_center', headerShown: false }}
          />
        </Stack.Navigator>
      </ImagesContext.Provider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    marginLeft: -16,
  },
});
