import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  CommentScreen,
  FollowersScreen,
  FollowingScreen,
  NewSparkleScreen,
  ProfileUpdateScreen,
  QuoteScreen,
  ThreadScreen,
} from '../screens';
import { ActivityActor } from '../utils/types';
import { HeaderLeftBackIcon } from '../components/thread';
import { StyleSheet } from 'react-native';
import { Text } from '../components';
import colors from '../config/colors';
import HashtagsNavigator from './HashtagsNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import routes from './routes';
import UsersNavigator from './UsersNavigator';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ExploreTabNavigator = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen
      name={routes.HASHTAGS_NAVIGATOR}
      component={HashtagsNavigator}
      options={{ title: 'Hashtags' }}
    />
    <Tab.Screen
      name={routes.USERS_NAVIGATOR}
      component={UsersNavigator}
      options={{ title: 'Sparklers' }}
    />
  </Tab.Navigator>
);

export default function ExploreNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.EXPLORE_TABS} component={ExploreTabNavigator} />

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
        name={routes.COMMENT}
        component={CommentScreen}
        options={{ animation: 'slide_from_bottom', headerShown: false }}
      />
      <Stack.Screen
        name={routes.QUOTE}
        component={QuoteScreen}
        options={{ animation: 'slide_from_bottom', headerShown: false }}
      />
      <Stack.Screen
        name={routes.PROFILE_UPDATE}
        component={ProfileUpdateScreen}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
      <Stack.Screen
        name={routes.NEW_SPARKLE}
        component={NewSparkleScreen}
        options={{ animation: 'slide_from_bottom', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    color: colors.dark,
    fontSize: 18,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
