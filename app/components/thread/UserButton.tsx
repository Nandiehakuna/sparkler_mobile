import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

import { MailIcon } from '../icons';
import { routes } from '../../navigation';
import { useFollow, useNavigation, useTheme, useToast, useUser } from '../../hooks';
import colors from '../../config/colors';
import EditProfileButton from '../profile/EditProfileButton';
import Text from '../Text';

interface Props {
  showOtherButtons?: boolean;
  userId: string;
  onShareProfile?: VoidFunction;
}

const UserButton = ({ showOtherButtons, onShareProfile, userId }: Props) => {
  const { isFollowing, toggleFollow } = useFollow({ userId });
  const { colorScheme, theme } = useTheme();
  const { user } = useUser();
  const navigation = useNavigation();
  const toast = useToast();

  const isTheSamePerson = user?._id === userId;

  const editProfile = () => navigation.navigate(routes.PROFILE_UPDATE, user);

  const handleMessaging = () => {
    user
      ? navigation.navigate(routes.MESSAGES_NAVIGATOR, { userId })
      : toast.show(`Login to message this user`, 'success');
  };

  const getFollowingColor = (): string =>
    colorScheme === 'light' ? theme.colors.text : colors.white;

  if (isTheSamePerson) return <EditProfileButton onPress={editProfile} />;

  return (
    <View style={styles.container}>
      {showOtherButtons && (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onShareProfile}>
            <Icon name="share-square-o" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { marginLeft: 10 }]}
            onPress={handleMessaging}
          >
            <MailIcon size={20} />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={toggleFollow}
        style={[
          styles.button,
          isFollowing
            ? { backgroundColor: 'transparent', borderColor: getFollowingColor() }
            : styles.notFollowing,
        ]}
      >
        <Text
          isBold
          style={[
            styles.text,
            isFollowing ? { color: getFollowingColor() } : styles.notFollowingText,
          ]}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
  },
  notFollowing: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  notFollowingText: {
    color: colors.white,
  },
  text: {
    fontSize: 14,
  },
});

export default UserButton;
