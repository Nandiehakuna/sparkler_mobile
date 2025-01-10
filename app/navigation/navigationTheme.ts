import { DefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

import colors from '../config/colors';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1DA1F2',
    background: colors.white,
    text: '#0F1419',
  },
  dark: false,
};

export const DimTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#274059',
    border: colors.light,
    card: '#274059',
    notification: '#274059',
    primary: '#1DA1F2',
    text: '#E1E8ED',
  },
  dark: true,
};

export const CustomDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#1DA1F2',
    background: colors.black,
    text: '#E1E8ED',
  },
  dark: true,
};

export default { CustomDarkTheme, DimTheme, LightTheme };
