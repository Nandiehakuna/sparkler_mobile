import { DefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

import colors from '../config/colors';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.blue,
    background: colors.white,
    text: '#0F1419',
  },
  dark: false,
};

const dimColor = '#274059';
const darkThemeTextColor = '#E1E8ED';
export const DimTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: dimColor,
    border: colors.light,
    card: dimColor,
    notification: dimColor,
    primary: colors.blue,
    text: darkThemeTextColor,
  },
  dark: true,
};

export const CustomDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: colors.blue,
    background: colors.black,
    text: darkThemeTextColor,
  },
  dark: true,
};

export default { CustomDarkTheme, DimTheme, LightTheme };
