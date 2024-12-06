import React, { useState } from "react";
import { StyleSheet, Modal as BaseModal, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { Button } from "..";
import { useUser } from "../../hooks";
import Modal, { AppModalProps } from "../Modal";
import MediaQuery from "./MediaQuery";
import service from "../../services/sparkles";

interface Props extends AppModalProps {
  actorId: string;
  sparkleId: string;
}

export default ({ actorId, onClose, sparkleId, ...props }: Props) => {
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const { user } = useUser();

  const confirmDeletionRequest = () => {
    onClose();
    setConfirmDeletion(true);
  };

  const deleteSparkle = async () => {
    setConfirmDeletion(false);

    await service.deleteSparkle(sparkleId);
    //TODO: Show a feedback to indicate success/failure
  };

  return (
    <View>
      <BaseModal visible={confirmDeletion} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmationContent}>
            <Button title="Yes, I'm sure" onPress={deleteSparkle} />
            <Button
              title="Cancel"
              onPress={() => setConfirmDeletion(false)}
              color="blue"
            />
          </View>
        </View>
      </BaseModal>

      <Modal {...props} style={styles.container} onClose={onClose}>
        {user._id === actorId ? (
          <MediaQuery
            Icon={<Icon name="trash-bin-outline" size={18} />}
            label="Delete Sparkle"
            onPress={confirmDeletionRequest}
          />
        ) : (
          <MediaQuery
            Icon={<Icon name="information-circle" size={18} />}
            label="More info will appear here"
            onPress={onClose}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
  },
  confirmationContent: {
    padding: 20,
  },
  container: {},
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
