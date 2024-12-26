import { Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { SparkleActivity } from '../../utils/types';
import { useUser } from '../../hooks';
import MediaQuery from './MediaQuery';
import Modal, { AppModalProps } from '../Modal';
import fileStorage from '../../storage/files';
import service from '../../api/sparkles';

interface Props extends AppModalProps {
  actorId: string;
  sparkle: SparkleActivity;
}

export default ({ actorId, onClose, sparkle, ...props }: Props) => {
  const { user } = useUser();

  const deleteSparkle = async () => {
    await service.deleteSparkle(sparkle.id);
    const images = sparkle?.attachments?.images || [];
    if (images.length) fileStorage.deleteImages(images);
  };

  const confirmDeletionRequest = () => {
    onClose();

    Alert.alert(
      'Sparkle deletion alert',
      'Are you sure you want to delete this sparkle? This action is permanent!',
      [
        { text: "I'm sure", onPress: deleteSparkle },
        { text: 'Never mind', isPreferred: true },
      ],
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
