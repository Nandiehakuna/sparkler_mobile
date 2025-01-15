import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ProfileScreen } from '../../screens/ProfileScreen';
import { useTheme } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  onScreenChange: (screen: ProfileScreen) => void;
  currentScreen: ProfileScreen;
}

interface BarProps {
  active: boolean;
  onPress?: () => void;
  title: string;
}

const Bar = ({ active, onPress, title }: BarProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.tabButton,
        {
          borderBottomColor: active ? colors.blue : theme.colors.background,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ProfileTopTabBar = ({ currentScreen, onScreenChange }: Props) => {
  const screens: { screen: ProfileScreen }[] = [
    { screen: 'sparkles' },
    { screen: 'media' },
    { screen: 'projects' },
  ];

  const getScreenTitle = (screen: string) =>
    screen.replace(screen.charAt(0), screen.charAt(0).toUpperCase());

  return (
    <View style={styles.tabBarContainer}>
      {screens.map(({ screen }) => (
        <Bar
          key={screen}
          title={getScreenTitle(screen)}
          onPress={() => onScreenChange(screen)}
          active={currentScreen === screen}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabButton: {
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 16,
  },
});

export default ProfileTopTabBar;
