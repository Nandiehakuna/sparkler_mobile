import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import colors from "../../config/colors";

interface Props {
  images: string[];
}

export default ({ images }: Props) => {
  if (!images.length) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: images[0] }} style={styles.image} />
      {images.length > 1 && (
        <Text style={styles.text}>+{images.length - 1} more images</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    borderRadius: 20,
    height: 200,
    marginTop: 3,
    objectFit: "cover",
    width: "100%",
  },
  text: {
    color: colors.medium,
    fontSize: 12,
    marginBottom: 1,
    marginRight: 5,
    textAlign: "right",
  },
});
