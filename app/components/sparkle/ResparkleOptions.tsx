import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Resparkle } from "../../assets/icons";
import { useResparkle } from "../../hooks";
import Modal from "../Modal";
import ModalContent from "./ResparkleOption";
import { StyleSheet, View } from "react-native";

interface Props {
  activity: { id: string };
  hasResparkled: boolean;
  visible: boolean;
  onClose: () => void;
}

export default ({ activity, hasResparkled, onClose, visible }: Props) => {
  const handler = useResparkle();

  const toggleResparkle = () => {
    onClose();
    return handler.toggleResparkle(activity, hasResparkled);
  };

  const handleQuoteCreation = () => {
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalContent
        Icon={<Resparkle />}
        label={hasResparkled ? "Undo Resparkle" : "Resparkle"}
        onPress={toggleResparkle}
      />
      <View style={styles.spacer} />
      <ModalContent
        Icon={<AntDesign name="edit" size={18} />}
        label="Quote Sparkle"
        onPress={handleQuoteCreation}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 3,
    width: "100%",
  },
});
