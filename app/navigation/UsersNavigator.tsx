import { createStackNavigator } from "@react-navigation/stack";

import { UsersScreen } from "../screens";
import { HeaderLeftBackIcon } from "../components/thread";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        headerLeft: () => <HeaderLeftBackIcon />,
      }}
    >
      <Stack.Screen
        name={routes.USERS}
        component={UsersScreen}
        options={{ headerLeft: undefined }}
      />
    </Stack.Navigator>
  );
};
