import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  BellIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  UserIcon,
} from "../components/icons";
import ExploreNavigator from "./ExploreNavigator";
import HomeNavigator from "./HomeNavigator";
import MessagesNavigator from "./MessagesNavigator";
import ProfileNavigator from "./ProfileNavigator";
import routes from "./routes";
import NotificationNavigator from "./NotificationNavigator";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={routes.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <HomeIcon color={color} size={size} />
          ),
          title: "Home",
        }}
      />
      <Tab.Screen
        name={routes.EXPLORE_NAVIGATOR}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <SearchIcon size={size} color={color} />
          ),
          title: "Explore",
        }}
      />
      <Tab.Screen
        name={routes.NOTIFICATION_NAVIGATOR}
        component={NotificationNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <BellIcon size={size} color={color} />
          ),
          title: "Notifications",
        }}
      />
      <Tab.Screen
        name={routes.MESSAGES_NAVIGATOR}
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MailIcon size={size} color={color} />
          ),
          title: "Messages",
        }}
      />
      <Tab.Screen
        name={routes.PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <UserIcon size={size} color={color} />
          ),
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};
