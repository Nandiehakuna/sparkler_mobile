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
  ReplyScreen,
  ThreadScreen,
  TimelineScreen,
} from '../screens';
import { HeaderLeftBackIcon, HeaderRightLoginButton } from '../components/header';
import { Text } from '../components';
import { ThreadHeader } from '../components/thread';
import { useTheme } from '../hooks';
import HeaderLeftUserIcon from '../components/header/HeaderLeftUserIcon';
import routes from './routes';
import TopBar from '../components/topBar/TopBar';

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
          headerRight: () => <HeaderRightLoginButton />,
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
        name={routes.REPLY}
        component={ReplyScreen}
        options={{ animation: 'slide_from_bottom', headerShown: false }}
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
