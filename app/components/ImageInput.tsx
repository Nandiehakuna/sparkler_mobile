import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

interface Props {
  imageUri?: string;
  onChangeImage: (image: null | string) => void;
}

export default function ImageInput({ imageUri, onChangeImage }: Props) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted)
      Alert.alert("You need to enable permission to access library!");
  };

  const selectImage = async () => {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        allowsEditing: true,
      });

      if (!canceled) onChangeImage(assets[0].uri);
    } catch (error) {
      Alert.alert("Error reading image!", "Retry again later.", [
        { text: "Ok" },
      ]);
    }
  };

  const handlePress = () => {
    imageUri
      ? Alert.alert("Delete", "Are you sure you want to delete this image", [
          { text: "Yes", onPress: () => onChangeImage(null) },
          { text: "No" },
        ])
      : selectImage();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Icon color={colors.medium} name="camera" size={40} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
