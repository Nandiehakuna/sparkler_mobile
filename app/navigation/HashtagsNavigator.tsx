import { createStackNavigator } from "@react-navigation/stack";

import { HashtagScreen, HashtagsScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.HASHTAGS}
        component={HashtagsScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name={routes.HASHTAG}
        component={HashtagScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};
