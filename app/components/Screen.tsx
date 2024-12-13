import React, { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

interface Props extends PropsWithChildren {
  style?: object;
}

export default ({ children, style }: Props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
