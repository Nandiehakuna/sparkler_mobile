import { createStackNavigator } from '@react-navigation/stack';

import { ActivityActor } from '../utils/types';
import {
  CommentScreen,
  HashtagScreen,
  NewSparkleScreen,
  ProfileScreen,
  ProfileUpdateScreen,
  QuoteScreen,
  ThreadScreen,
  TimelineScreen,
} from '../screens';
import { HeaderLeftBackIcon, HeaderRightLoginButton, ThreadHeader } from '../components/thread';
import { Text } from '../components';
import { useTheme } from '../hooks';
import HeaderLeftUserIcon from '../components/header/HeaderLeftUserIcon';
import routes from './routes';

const Stack = createStackNavigator();

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
        name={routes.TIMELINE}
        component={TimelineScreen}
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
