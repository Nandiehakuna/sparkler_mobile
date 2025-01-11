import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

import { MailIcon } from '../icons';
import { routes } from '../../navigation';
import { useFollow, useNavigation, useUser } from '../../hooks';
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
  const { user } = useUser();
  const navigation = useNavigation();

  const isTheSamePerson = user?._id === userId;

  const editProfile = () => navigation.navigate(routes.PROFILE_UPDATE, user);

  if (isTheSamePerson) return <EditProfileButton onPress={editProfile} />;

  return (
    <View style={styles.container}>
      {showOtherButtons && (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onShareProfile}>
            <Icon name="share-alt" size={20} color={colors.medium} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { marginLeft: 10 }]}
            onPress={() => navigation.navigate(routes.MESSAGES_NAVIGATOR, { userId })}
          >
            <MailIcon size={20} />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={toggleFollow}
        style={[styles.button, isFollowing ? styles.following : styles.notFollowing]}
      >
        <Text
          isBold
          style={[styles.text, isFollowing ? styles.followingText : styles.notFollowingText]}
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
  following: {
    backgroundColor: 'transparent',
    borderColor: colors.medium,
  },
  followingText: {
    color: colors.black,
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
    fontWeight: 'bold',
  },
});

export default UserButton;
