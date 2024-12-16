import { Alert } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { useUser } from "../../hooks";
import Modal, { AppModalProps } from "../Modal";
import MediaQuery from "./MediaQuery";
import service from "../../api/sparkles";

interface Props extends AppModalProps {
  actorId: string;
  sparkleId: string;
}

export default ({ actorId, onClose, sparkleId, ...props }: Props) => {
  const { user } = useUser();

  const deleteSparkle = async () => {
    await service.deleteSparkle(sparkleId);
    //TODO: Show a feedback to indicate success/failure
  };

  const confirmDeletionRequest = () => {
    onClose();

    Alert.alert(
      "Sparkle deletion alert",
      "Are you sure you want to delete this sparkle? This action is permanent!",
      [
        { text: "I'm sure", onPress: deleteSparkle },
        { text: "Never mind", isPreferred: true },
      ]
    );
  };

  return (
    <Modal {...props} onClose={onClose}>
      {user?._id === actorId ? (
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
  );
};
