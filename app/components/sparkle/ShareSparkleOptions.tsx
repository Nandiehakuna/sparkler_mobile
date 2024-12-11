import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import Text from "../Text";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sparkleUrl: string;
  text?: string;
  title?: string;
}

const SparkleShareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  sparkleUrl,
  text,
  title,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(
      `${text || "Check out this Sparkle!"} ${sparkleUrl}`
    ); // Updated method
    setCopySuccess(true);
    Alert.alert("Copied", "Link copied to clipboard!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareText = text ? encodeURIComponent(text) : "Check out this Sparkle!";
  const encodedUrl = encodeURIComponent(sparkleUrl);

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Share this {title || "Sparkle"}</Text>
          <View style={styles.shareOptions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                Linking.openURL(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${shareText}`
                )
              }
            >
              <FontAwesome name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                Linking.openURL(
                  `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`
                )
              }
            >
              <FontAwesome name="twitter" size={24} color="#1da1f2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/?text=${shareText}%20${encodedUrl}`
                )
              }
            >
              <FontAwesome name="whatsapp" size={24} color="#25d366" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleCopy}>
              <FontAwesome
                name="copy"
                size={24}
                color={copySuccess ? "#0f0" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  shareOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
});

export default SparkleShareModal;
