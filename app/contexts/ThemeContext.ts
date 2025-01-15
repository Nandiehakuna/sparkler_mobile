import { createContext } from 'react';
import { Theme } from '@react-navigation/native';

import { LightTheme } from '../navigation/navigationTheme';

type Value = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const themeContext = createContext<Value>({
  theme: LightTheme,
  setTheme: () => {},
});

export default themeContext;
