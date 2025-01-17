import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ActivityActor } from '../utils/types';
import {
  CommentScreen,
  HashtagScreen,
  NewProjectScreen,
  NewSparkleScreen,
  ProfileScreen,
  ProfileUpdateScreen,
  ProjectsScreen,
  QuoteScreen,
  ThreadScreen,
  TimelineScreen,
} from '../screens';
import { ThreadHeader } from '../components/thread';
import { Text } from '../components';
import { useTheme, useUser } from '../hooks';
import HeaderLeftUserIcon from '../components/header/HeaderLeftUserIcon';
import routes from './routes';
import TopBar from '../components/topBar/TopBar';
import { HeaderLeftBackIcon, HeaderRightFeedbackButton } from '../components/header';
import HeaderRightLoginButton from '../components/header/HeaderRightLoginButton';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TimelineTab = () => (
  <TopBar>
    <Tab.Screen
      name={routes.TIMELINE}
      component={TimelineScreen}
      options={{ title: 'Following' }}
    />
    <Tab.Screen name={routes.PROJECTS} component={ProjectsScreen} />
  </TopBar>
);

export default ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => <HeaderLeftBackIcon />,
      }}
    >
      <Stack.Screen
        name={routes.TIMELINE_TAB}
        component={TimelineTab}
        options={{
          headerRight: () => (user ? <HeaderRightFeedbackButton /> : <HeaderRightLoginButton />),
          headerTitleAllowFontScaling: true,
          headerTitle: () => (
            <Text isBold style={{ color: theme.colors.text, fontSize: 20 }}>
              Sparkler
            </Text>
          ),
          headerLeft: () => <HeaderLeftUserIcon onPress={navigation.openDrawer} />,
        }}
      />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: 'slide_from_right',
          headerTitle: () => <ThreadHeader />,
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: 'slide_from_bottom',
          headerTitle: () => <ThreadHeader label={(route.params as ActivityActor)?.data?.name} />,
          headerTitleStyle: { fontSize: 20 },
        })}
      />
      <Stack.Screen
        name={routes.COMMENT}
        component={CommentScreen}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.QUOTE}
        component={QuoteScreen}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.PROFILE_UPDATE}
        component={ProfileUpdateScreen}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
      <Stack.Screen
        name={routes.NEW_PROJECT}
        component={NewProjectScreen}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.NEW_SPARKLE}
        component={NewSparkleScreen}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.HASHTAG}
        component={HashtagScreen}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
    </Stack.Navigator>
  );
};
