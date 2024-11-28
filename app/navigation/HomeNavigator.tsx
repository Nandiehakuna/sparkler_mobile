import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ThreadScreen, TimelineScreen } from "../screens";
import routes from "./routes";
import { HeaderLeftBackIcon } from "../components/thread";

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
    </Stack.Navigator>
  );
};
