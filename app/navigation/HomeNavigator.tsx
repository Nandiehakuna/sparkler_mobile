import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import {
  AuthScreen,
  CommentScreen,
  FollowersScreen,
  FollowingScreen,
  ProfileScreen,
  ThreadScreen,
  TimelineScreen,
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
          headerTitle: () => <ThreadHeader label="Sparkler" />,
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
    </Stack.Navigator>
  );
};
