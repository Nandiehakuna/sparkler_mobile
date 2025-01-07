import { Image, StyleSheet } from 'react-native';
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
import HeaderLeftUserIcon from '../components/header/HeaderLeftUserIcon';
import routes from './routes';

const Stack = createStackNavigator();

export default ({ navigation }) => {
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
          headerTitle: () => <Image source={require('../assets/icon.png')} style={styles.logo} />,
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

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 120,
  },
});
