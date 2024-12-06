import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import { ActivityActor } from "../utils/types";
import {
  AuthScreen,
  FollowersScreen,
  FollowingScreen,
  ProfileScreen,
  ThreadScreen,
  TimelineScreen,
} from "../screens";
import {
  HeaderLeftBackIcon,
  HeaderRightLoginButton,
} from "../components/thread";
import { Text } from "../components";
import colors from "../config/colors";
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
          headerTitle: () => <Text style={styles.logo}>Sparkler</Text>,
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: "slide_from_right",
          headerTitle: () => (
            <Text style={[styles.logo, styles.title]}>Sparkle</Text>
          ),
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",
          headerTitle: () => (
            <Text style={[styles.logo, styles.title]}>
              {(route.params as ActivityActor)?.data?.name}
            </Text>
          ),
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: colors.dark,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
