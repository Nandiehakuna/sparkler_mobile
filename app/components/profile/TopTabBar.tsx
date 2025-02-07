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
          borderBottomColor: active ? colors.blue : 'transparent',
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, { color: active ? colors.blue : theme.colors.text }]}>
        {title}
      </Text>
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
    <View>
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
      <View style={styles.divider} />
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tabText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.light,
    marginHorizontal: 16,
    marginTop: -4,
  },
});

export default ProfileTopTabBar;
