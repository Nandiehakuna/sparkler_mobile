import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from "../Text";
import colors from "../../config/colors";

interface Props {
  setShowMediaSparkles: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopTabBar = ({ setShowMediaSparkles }: Props) => {
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          { borderBottomWidth: 2, borderBottomColor: colors.primary },
        ]}
        onPress={() => setShowMediaSparkles(false)}
      >
        <Text style={styles.tabText}>Sparkles</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setShowMediaSparkles(true)}
      >
        <Text style={styles.tabText}>Media</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.blue,
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
