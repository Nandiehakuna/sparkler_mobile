import { PropsWithChildren } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTheme } from '../../hooks';
import colors from '../../config/colors';

const Tab = createMaterialTopTabNavigator();

export default function CustomTopTabBar({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        lazy: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0.2,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.blue,
          borderRadius: 2,
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.medium,
      }}
    >
      {children}
    </Tab.Navigator>
  );
}
