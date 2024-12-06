import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HashtagsNavigator from "./HashtagsNavigator";
import UsersNavigator from "./UsersNavigator";
import routes from "./routes";

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator id={undefined} options={{}}>
      <Tab.Screen
        name={routes.HASHTAGS_NAVIGATOR}
        component={HashtagsNavigator}
        options={{ title: "Hashtags" }}
      />
      <Tab.Screen
        name={routes.USERS_NAVIGATOR}
        component={UsersNavigator}
        options={{ title: "Sparklers" }}
      />
    </Tab.Navigator>
  );
};
