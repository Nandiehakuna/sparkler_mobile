import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import {
  CommentScreen,
  FollowersScreen,
  FollowingScreen,
  NewSparkleScreen,
  ProfileScreen,
  ThreadScreen,
  UsersScreen,
  ViewImageScreen,
} from "../screens";
import { HeaderLeftBackIcon } from "../components/thread";
import { Text } from "../components";
import colors from "../config/colors";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        headerLeft: () => <HeaderLeftBackIcon />,
      }}
    >
      <Stack.Screen
        name={routes.USERS}
        component={UsersScreen}
        options={{ headerLeft: undefined }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          title: (route.params as ActivityActor)?.data?.name,
          animation: "slide_from_bottom",
          headerShown: true,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: "slide_from_right",
          headerTitle: () => (
            <Text style={[styles.logo, styles.title]}>Sparkle</Text>
          ),
          headerShown: true,
          headerTitleAlign: "center",
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
