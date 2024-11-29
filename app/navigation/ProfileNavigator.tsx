import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};
