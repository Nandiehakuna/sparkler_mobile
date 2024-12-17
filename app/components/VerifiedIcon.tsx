import { StyleSheet, Image } from "react-native";

export default () => {
  return (
    <Image
      source={require("../assets/verified.png")}
      style={styles.verifiedIcon}
    />
  );
};

const styles = StyleSheet.create({
  verifiedIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});
