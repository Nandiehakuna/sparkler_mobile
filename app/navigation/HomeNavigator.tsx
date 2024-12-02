import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import { ActivityActor } from "../utils/types";
import {
  AuthScreen,
  ProfileScreen,
  ThreadScreen,
  TimelineScreen,
} from "../screens";
import {
  HeaderLeftBackIcon,
  HeaderRightLoginButton,
} from "../components/thread";
import { Text } from "../components";
import routes from "./routes";
import colors from "../config/colors";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name={routes.TIMELINE}
        component={TimelineScreen}
        options={{
          headerRight: () => <HeaderRightLoginButton />,
          headerTitleAllowFontScaling: true,
          headerTitle: () => <Text style={styles.logo}>Sparkler</Text>,
        }}
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
        }}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",
          headerLeft: () => <HeaderLeftBackIcon />,
          headerTitle: () => (
            <Text style={[styles.logo, styles.title]}>
              {(route.params as ActivityActor)?.data?.name}
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name={routes.AUTH}
        component={AuthScreen}
        options={{
          animation: "scale_from_center",
          headerLeft: () => <HeaderLeftBackIcon />,
          title: "Welcome to Sparkler",
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
