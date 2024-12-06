import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { ProfileMediaScreen, ProfileSparklesScreen } from "../screens";
import routes from "./routes";
import FollowersScreen from "../screens/FollowersScreen";

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        swipeEnabled: true,
        tabBarScrollEnabled: false,
      }}
    >
      <Tab.Screen
        name={routes.PROFILE_SPARKLES}
        component={ProfileSparklesScreen}
        options={{ title: "Sparkles" }}
      />
      <Tab.Screen
        name={routes.PROFILE_MEDIA}
        component={ProfileMediaScreen}
        options={{ title: "Media" }}
      />
    </Tab.Navigator>
  );
};
