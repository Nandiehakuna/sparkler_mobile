import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../screens";
import routes from "./routes";
import { Text } from "../components";
import { HeaderLeftBackIcon } from "../components/thread";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import { ActivityActor } from "../utils/types";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",
          headerLeft: () => <HeaderLeftBackIcon />,
          headerTitle: () => {
            const name =
              (route.params as ActivityActor)?.data?.name || "My Profile";
            return <Text style={styles.title}>{name}</Text>;
          },
          headerTitleAlign: "center",
        })}
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
