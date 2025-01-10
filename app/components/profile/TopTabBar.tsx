import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  setShowMediaSparkles: React.Dispatch<React.SetStateAction<boolean>>;
  showingMedia: boolean;
}

interface BarProps {
  active: boolean;
  title: string;
  onPress: () => void;
}

const Bar = ({ active, onPress, title }: BarProps) => (
  <TouchableOpacity
    style={[
      styles.tabButton,
      {
        borderBottomWidth: 2,
        borderBottomColor: active ? colors.blue : colors.white,
      },
    ]}
    onPress={onPress}
  >
    <Text style={styles.tabText}>{title}</Text>
  </TouchableOpacity>
);

const TopTabBar = ({ setShowMediaSparkles, showingMedia }: Props) => {
  return (
    <View style={styles.tabBarContainer}>
      <Bar onPress={() => setShowMediaSparkles(false)} title="Sparkles" active={!showingMedia} />
      <Bar onPress={() => setShowMediaSparkles(true)} title="Media" active={showingMedia} />
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
  },
  tabText: {
    fontSize: 16,
    color: colors.dark,
  },
});

export default TopTabBar;
