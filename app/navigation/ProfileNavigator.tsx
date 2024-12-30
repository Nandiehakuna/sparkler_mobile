import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { ActivityActor } from '../utils/types';
import {
  AuthScreen,
  CommentScreen,
  FollowingScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  NewSparkleScreen,
  ViewImageScreen,
  QuoteScreen,
  ProfileUpdateScreen,
} from '../screens';
import { HeaderLeftBackIcon } from '../components/thread';
import colors from '../config/colors';
import routes from './routes';
import Text from '../components/Text';

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
        options={({ route }) => ({
          animation: 'slide_from_bottom',
          headerTitle: () => {
            const name =
              (route.params as ActivityActor)?.data?.name || 'My Profile';
            return (
              <Text useBoldFontFamily style={styles.title}>
                {name}
              </Text>
            );
          },
        })}
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
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
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

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
