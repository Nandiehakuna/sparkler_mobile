import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import {
  AuthScreen,
  CommentScreen,
  FollowingScreen,
<<<<<<< HEAD
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
=======
  NewSparkleScreen,
  ProfileScreen,
  ViewImageScreen,
>>>>>>> aa3ee092b47322648c370c51c83d4a295e28bb58
} from "../screens";
import { HeaderLeftBackIcon } from "../components/thread";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import FollowersScreen from "../screens/FollowersScreen";
import routes from "./routes";
import Text from "../components/Text";
import ProfileSetupScreen from "../screens/ProfileSetupScreen";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => <HeaderLeftBackIcon />,
      }}
    >
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",
          headerTitle: () => {
            const name =
              (route.params as ActivityActor)?.data?.name || "My Profile";
            return <Text style={styles.title}>{name}</Text>;
          },
        })}
      />
      <Stack.Screen
        name={routes.AUTH}
        component={AuthScreen}
        options={{
          animation: "scale_from_center",
          title: "Welcome to Sparkler",
        }}
      />
      <Stack.Screen
        name={routes.FOLLOWERS}
        component={FollowersScreen}
        options={{ title: "Followers", animation: "slide_from_left" }}
      />
      <Stack.Screen
        name={routes.FOLLOWING}
        component={FollowingScreen}
        options={{ title: "Following", animation: "slide_from_left" }}
      />
      <Stack.Screen
        name={routes.COMMENT}
        component={CommentScreen}
        options={{ animation: "slide_from_bottom", headerShown: false }}
      />
<<<<<<< HEAD

      

      <Stack.Screen
      name={routes.REGISTER}
      component={RegisterScreen}
      options={{title:"Register"}}
      
      />

      <Stack.Screen
      name={routes.LOGIN}
      component={LoginScreen}
      options={{title:"Login"}}
      
      />
      
      <Stack.Screen
      name={routes.PROFILE_SETUP}
      component={ProfileSetupScreen}

      
=======
      <Stack.Screen
        name={routes.NEW_SPARKLE}
        component={NewSparkleScreen}
        options={{ animation: "slide_from_bottom", headerShown: false }}
      />
      <Stack.Screen
        name={routes.VIEW_IMAGE}
        component={ViewImageScreen}
        options={{ animation: "scale_from_center", headerShown: false }}
>>>>>>> aa3ee092b47322648c370c51c83d4a295e28bb58
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
