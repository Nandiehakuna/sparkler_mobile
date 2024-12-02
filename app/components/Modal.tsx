import React from "react";
import {
  Modal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import colors from "../config/colors";

interface Props extends ModalProps {
  onClose: () => void;
}

export default ({ children, onClose, ...rest }: Props) => {
  return (
    <Modal animationType="slide" transparent {...rest}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            {/* Prevent click-through */}
            <View style={styles.modalContent}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.light,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderTopColor: colors.light,
    borderTopWidth: 1,
    padding: 16,
  },
});
