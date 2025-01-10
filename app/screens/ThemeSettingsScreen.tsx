import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Theme } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { Button, Text } from '../components';
import { LightTheme, DimTheme, CustomDarkTheme } from '../navigation/navigationTheme';
import { ScreenProps } from '../utils/types';
import useTheme from '../hooks/useTheme';

type IconName = React.ComponentProps<typeof Icon>['name'];

const themes: { name: string; theme: Theme; icon: IconName }[] = [
  { name: 'Light', icon: 'wb-sunny', theme: LightTheme },
  { name: 'Dim', icon: 'brightness-6', theme: DimTheme },
  { name: 'Dark', icon: 'nights-stay', theme: CustomDarkTheme },
];

export default function ThemeSwitcher({ navigation }: ScreenProps) {
  const { theme, saveTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text isBold style={[styles.title, { color: theme.colors.text }]}>
        Select Theme Mode
      </Text>
      <View style={styles.iconContainer}>
        {themes.map(({ name, icon, theme: modeTheme }) => (
          <TouchableOpacity
            key={name}
            style={[styles.iconButton, theme === modeTheme && styles.selectedButton]}
            onPress={() => saveTheme(modeTheme)}
          >
            <Icon name={icon} size={40} color={theme.colors.primary} />
            <Text style={[styles.iconLabel, { color: theme.colors.text }]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Done" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#1DA1F2',
  },
  iconLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
  },
});
