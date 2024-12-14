import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import ImageInput from "./ImageInput";

interface Props {
  imageUris: string[];
  onAddImage: (image: string) => void;
  onRemoveImage: (image: string) => void;
}

export default function ImageInputList(props: Props) {
  const scrollView = useRef<ScrollView | null>(null);

  const { imageUris, onAddImage, onRemoveImage } = props;

  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage?.(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={onAddImage} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
