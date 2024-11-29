import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import { HeaderLeftBackIcon } from "../components/thread";
import { ProfileScreen, UsersScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.USERS} component={UsersScreen} />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          title: (route.params as ActivityActor)?.data?.name,
          animation: "slide_from_bottom",
          headerLeft: () => <HeaderLeftBackIcon />,
          headerShown: true,
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
};
