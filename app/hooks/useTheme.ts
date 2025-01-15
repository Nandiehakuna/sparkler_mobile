import { useContext } from 'react';
import { Theme } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { LightTheme } from '../navigation/navigationTheme';
import { ThemeContext } from '../contexts';
import colors from '../config/colors';

const key = 'appTheme';

const useTheme = () => {
  const context = useContext(ThemeContext);

  const saveTheme = async (theme: Theme) => {
    try {
      context.setTheme(theme);
      await SecureStore.setItemAsync(key, JSON.stringify(theme));
    } catch (error) {
      console.log(`Error saving a theme: ${error}`);
    }
  };

  const getTheme = async (): Promise<Theme | undefined> => {
    try {
      const theme = await SecureStore.getItemAsync(key);
      return theme ? (JSON.parse(theme) as Theme) : undefined;
    } catch (error) {
      console.error(`Error getting the current theme... ${error}`);
    }
  };

  const retrieveSavedTheme = async (): Promise<Theme> => {
    const theme = await getTheme();
    if (theme) return theme;

    saveTheme(LightTheme);
    return LightTheme;
  };

  const getCurrentTheme = (): 'dark' | 'light' | 'dim' => {
    const { background } = context.theme.colors;

    if (background === colors.black) return 'dark';

    if (background === colors.white) return 'light';

    return 'dim';
  };

  return { ...context, getTheme, retrieveSavedTheme, saveTheme, currentTheme: getCurrentTheme() };
};

export default useTheme;
