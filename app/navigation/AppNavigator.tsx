import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconBadge } from 'expo-activity-feed';
import { ToastProvider } from 'react-native-toast-notifications';
import Icon from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

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
  AboutScreen,
  ThreadScreen,
  CommentScreen,
  QuoteScreen,
  ProfileUpdateScreen,
  ReplyScreen,
} from '../screens';
import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  UserIcon,
  FeedbackIcon,
  MessageTabIcon,
} from '../components/icons';
import { HeaderLeftBackIcon } from '../components/header';
import { ThreadHeader } from '../components/thread';
import { ImagesContext } from '../contexts';
import { usePushNotifications, useTheme, useUser } from '../hooks';
import colors from '../config/colors';
import DrawerContent from '../components/drawer/DrawerContent';
import ExploreNavigator from './ExploreNavigator';
import HomeNavigator from './HomeNavigator';
import MessagesScreen from '../screens/MessagesScreen';
import NotificationsNavigator from './NotificationsNavigator';
import routes from './routes';

type IconName = React.ComponentProps<typeof Icon>['name'];

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
          tabBarIcon: (props) => <MessageTabIcon {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const AppDrawer = () => {
  const { colorScheme } = useTheme();
  const { user } = useUser();

  const getLightModeIconName = (): IconName => {
    if (colorScheme === 'dark') return 'nights-stay';

    if (colorScheme === 'dim') return 'brightness-6';

    return 'wb-sunny';
  };

  return (
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
          headerShown: true,
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
          drawerLabel: 'Give Feedback',
        }}
      />
      <Drawer.Screen
        name={routes.ABOUT}
        component={AboutScreen}
        options={{
          drawerIcon: (props) => <Entypo name="info" {...props} />,
          drawerLabel: 'About Sparkler',
        }}
      />
      <Drawer.Screen
        name={routes.THEME_SETTINGS}
        component={ThemeSettingsScreen}
        options={{
          drawerIcon: (props) => <Icon name={getLightModeIconName()} {...props} />,
          drawerLabel: `${colorScheme} mode (Switch modes)`,
        }}
      />
    </Drawer.Navigator>
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
            name={routes.PROFILE_UPDATE}
            component={ProfileUpdateScreen}
            options={{ animation: 'slide_from_right', headerShown: false }}
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
            name={routes.COMMENT}
            component={CommentScreen}
            options={{ animation: 'slide_from_bottom', headerShown: false }}
          />
          <Stack.Screen
            name={routes.REPLY}
            component={ReplyScreen}
            options={{ animation: 'slide_from_bottom', headerShown: false }}
          />
          <Stack.Screen
            name={routes.QUOTE}
            component={QuoteScreen}
            options={{ animation: 'slide_from_bottom', headerShown: false }}
          />
          <Stack.Screen
            name={routes.PROFILE}
            component={ProfileScreen}
            options={({ route }) => ({
              headerTitle: () => (
                <ThreadHeader label={(route.params as ActivityActor)?.data?.name} />
              ),
              animation: 'slide_from_bottom',
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => <HeaderLeftBackIcon />,
              headerTitleStyle: { fontSize: 20 },
            })}
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
