import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";

const theme: Theme = {
  ...DefaultTheme, // Spread the default theme
  colors: {
    ...DefaultTheme.colors, // Spread the default colors
    primary: "#e6207c", // Override the primary color
  },
};

export default theme;
