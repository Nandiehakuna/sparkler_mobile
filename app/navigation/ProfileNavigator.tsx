import { createStackNavigator } from '@react-navigation/stack';

import { ActivityActor } from '../utils/types';
import {
  CommentScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  NewSparkleScreen,
  ViewImageScreen,
  ProfileUpdateScreen,
  ReplyScreen,
} from '../screens';
import { HeaderLeftBackIcon } from '../components/header';
import { ThreadHeader } from '../components/thread';
import routes from './routes';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => <HeaderLeftBackIcon />,
      }}
    >
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
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
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen
        name={routes.NEW_SPARKLE}
        component={NewSparkleScreen}
        options={{ animation: 'slide_from_bottom', headerShown: false }}
      />
      <Stack.Screen
        name={routes.PROFILE_UPDATE}
        component={ProfileUpdateScreen}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
      <Stack.Screen
        name={routes.VIEW_IMAGE}
        component={ViewImageScreen}
        options={{ animation: 'scale_from_center', headerShown: false }}
      />
    </Stack.Navigator>
  );
};
