import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import { HeaderLeftBackIcon } from "../components/thread";
import { ProfileScreen, ThreadScreen, TimelineScreen } from "../screens";
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
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          title: "Sparkle",
          animation: "slide_from_right",
          headerLeft: () => <HeaderLeftBackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          title: (route.params as ActivityActor)?.data?.name,
          animation: "slide_from_bottom",
          headerLeft: () => <HeaderLeftBackIcon />,
        })}
      />
    </Stack.Navigator>
  );
};
