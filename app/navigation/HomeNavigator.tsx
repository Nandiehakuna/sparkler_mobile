import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { TimelineScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={routes.TIMELINE}
        component={TimelineScreen}
        options={{ title: "My Timeline" }}
      />
    </Stack.Navigator>
  );
};
