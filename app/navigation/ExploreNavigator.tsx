import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UsersScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.USERS} component={UsersScreen} />
    </Stack.Navigator>
  );
};
