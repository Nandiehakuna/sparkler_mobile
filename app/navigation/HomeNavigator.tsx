import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet } from "react-native";

import { ActivityActor } from "../utils/types";
import {
  AuthScreen,
  CommentScreen,
  FollowersScreen,
  FollowingScreen,
  LoginScreen,
  NewSparkleScreen,
  ProfileScreen,
  RegisterScreen,
  ThreadScreen,
  TimelineScreen,
  ViewImageScreen,
} from "../screens";
import {
  HeaderLeftBackIcon,
  HeaderRightLoginButton,
  ThreadHeader,
} from "../components/thread";
import routes from "./routes";

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
        name={routes.TIMELINE}
        component={TimelineScreen}
        options={{
          headerRight: () => <HeaderRightLoginButton />,
          headerTitleAllowFontScaling: true,
          headerTitle: () => (
            <Image source={require("../assets/icon.png")} style={styles.logo} />
          ),
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: "slide_from_right",
          headerTitle: () => <ThreadHeader />,
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",
          headerTitle: () => (
            <ThreadHeader label={(route.params as ActivityActor)?.data?.name} />
          ),
        })}
      />
      <Stack.Screen
        name={routes.AUTH}
        component={AuthScreen}
        options={{
          animation: "scale_from_center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{
          headerShown: false,
          animation: "slide_from_left",
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
      <Stack.Screen
        name={routes.NEW_SPARKLE}
        component={NewSparkleScreen}
        options={{ animation: "slide_from_bottom", headerShown: false }}
      />
      <Stack.Screen
        name={routes.VIEW_IMAGE}
        component={ViewImageScreen}
        options={{ animation: "scale_from_center", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 120,
  },
});
