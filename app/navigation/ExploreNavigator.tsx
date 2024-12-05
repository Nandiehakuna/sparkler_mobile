import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import { HeaderLeftBackIcon } from "../components/thread";
import { ProfileScreen, ThreadScreen, UsersScreen } from "../screens";
import { Text } from "../components";
import colors from "../config/colors";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
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
      <Stack.Screen
        name={routes.THREAD}
        component={ThreadScreen}
        options={{
          animation: "slide_from_right",
          headerLeft: () => <HeaderLeftBackIcon />,
          headerTitle: () => (
            <Text style={[styles.logo, styles.title]}>Sparkle</Text>
          ),
          headerShown: true,
          headerTitleAlign: "center",
        }}
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
