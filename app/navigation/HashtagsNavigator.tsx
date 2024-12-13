import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import {
  CommentScreen,
  FollowersScreen,
  FollowingScreen,
  HashtagScreen,
  HashtagsScreen,
  NewSparkleScreen,
  ProfileScreen,
  ThreadScreen,
} from "../screens";
import { ThreadHeader } from "../components/thread";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.HASHTAGS}
        component={HashtagsScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name={routes.HASHTAG}
        component={HashtagScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: "slide_from_right",
          headerTitle: () => <ThreadHeader label="Sparkle" />,
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
    </Stack.Navigator>
  );
};
