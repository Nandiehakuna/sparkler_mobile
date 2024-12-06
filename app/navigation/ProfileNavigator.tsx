import { createStackNavigator } from "@react-navigation/stack";

import { ActivityActor } from "../utils/types";
import { AuthScreen, FollowingScreen, ProfileScreen } from "../screens";
import { HeaderLeftBackIcon } from "../components/thread";
import { StyleSheet } from "react-native";
import { Text } from "../components";
import routes from "./routes";
import colors from "../config/colors";
import FollowersScreen from "../screens/FollowersScreen";

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
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",
          headerTitle: () => {
            const name =
              (route.params as ActivityActor)?.data?.name || "My Profile";
            return <Text style={styles.title}>{name}</Text>;
          },
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.dark,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
