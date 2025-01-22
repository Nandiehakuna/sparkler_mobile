import { Alert } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { SparkleActivity } from '../../utils/types';
import { useFollow, useSparkle, useTheme, useToast, useUser } from '../../hooks';
import MediaQuery from './MediaQuery';
import Modal, { AppModalProps } from '../Modal';

interface Props extends AppModalProps {
  actorId: string;
  sparkle: SparkleActivity;
}

export default ({ actorId, onClose, sparkle, ...props }: Props) => {
  const { user } = useUser();
  const { deleteSparkle } = useSparkle();
  const { isFollowing, toggleFollow } = useFollow({ userId: actorId });
  const { theme } = useTheme();
  const toast = useToast();

  const confirmDeletionRequest = () => {
    onClose();

    Alert.alert(
      'Sparkle deletion alert',
      'Are you sure you want to delete this sparkle? This action is permanent!',
      [
        { text: "I'm sure", onPress: () => deleteSparkle(sparkle) },
        { text: 'Never mind', isPreferred: true },
      ]
    );
  };

  const handleFollowToggle = () => {
    user ? toggleFollow() : toast.show('Login to follow sparkler', 'success');

    onClose();
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
          Icon={
            <FontAwesome6
              name={`user-${isFollowing ? 'minus' : 'plus'}`}
              size={18}
              color={theme.colors.text}
            />
          }
          label={`${isFollowing ? 'Unfollow' : 'Follow'}`}
          onPress={handleFollowToggle}
        />
      )}
    </Modal>
  );
};
