import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Image, Screen } from "../components";
import { ScreenProps } from "../utils/types";
import colors from "../config/colors";

export default function ViewImageScreen({ navigation, route }: ScreenProps) {
  const { images } = route.params;
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <Screen style={styles.container}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" color={colors.white} size={35} />
        </TouchableOpacity>
      </View>

      <Image style={styles.image} uri={currentImage} />

      {images.length > 1 && (
        <View style={styles.imageRow}>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCurrentImage(item)}>
                <View
                  style={[
                    styles.smallImageContainer,
                    item === currentImage && styles.selectedImage,
                  ]}
                >
                  <Image style={styles.smallImage} uri={item} />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
    zIndex: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: "100%",
    marginBottom: 20,
    width: "100%",
    objectFit: "contain",
  },
  imageRow: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  smallImageContainer: {
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  smallImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: colors.white,
  },
});
