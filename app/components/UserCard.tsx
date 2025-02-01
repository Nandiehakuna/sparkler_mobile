import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image as RnImage,
  ImageSourcePropType,
} from 'react-native';

import { ActorName } from './sparkle';
import { UserButton } from './thread';
import { getActorFromUser } from '../utils/funcs';
import { useProfileUser, useTheme } from '../hooks';
import { User } from '../contexts/UsersContext';
import Avatar from './Avatar';
import colors from '../config/colors';
import Text from './Text';
import UserCardIcons from './UserCardIcons';

interface Props {
  user: User;
  onPress?: () => void;
}

const UserCard = ({ onPress, user }: Props) => {
  const { theme } = useTheme();
  const { viewProfile } = useProfileUser();

  if (!user) return null;

  const { profileImage, bio, timestamp, coverImage, youtube, linkedIn, instagram, customLink } =
    user;

  const visitProfile = () => {
    onPress?.();
    viewProfile(user);
  };

  const getCoverImage = (): ImageSourcePropType =>
    coverImage ? { uri: coverImage } : require('../assets/cover-image.jpg');

  const getBackgroundColor = () => {
    const color = theme.colors.background;

    return color === colors.black ? '#423e3e' : color;
  };

  const getProfileTranslateY = (): number => {
    const hasNoLink: boolean =
      !youtube?.length && !linkedIn?.length && !instagram?.length && !customLink?.length;

    if (hasNoLink) return coverImage ? -30 : -10;

    return coverImage ? -50 : -40;
  };

  return (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: getBackgroundColor() }]}
      onPress={visitProfile}
    >
      <View>
        <RnImage style={styles.coverImage} source={getCoverImage()} />
        <View style={styles.overlay} />
        <View
          style={[styles.profileSection, { transform: [{ translateY: getProfileTranslateY() }] }]}
        >
          <Avatar image={profileImage} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.followButton}>
            <UserButton userId={user._id} />
          </View>
          <ActorName onPress={visitProfile} actor={getActorFromUser(user)} time={timestamp} />
        </View>
        <View style={styles.bioContainer}>
          {Boolean(bio?.length) && (
            <Text style={styles.bio} numberOfLines={2}>
              {bio}
            </Text>
          )}
        </View>
        <View>
          <UserCardIcons {...user} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bio: {
    fontSize: 14,
    marginTop: 4,
    paddingHorizontal: 3,
    letterSpacing: 0.5,
  },
  bioContainer: {
    paddingHorizontal: 7,
    marginTop: 3,
  },
  coverImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 105,
    objectFit: 'cover',
    width: '100%',
  },
  followButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginTop: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  profileImage: {
    borderColor: colors.white,
    borderRadius: 30,
    height: 60,
    objectFit: 'cover',
    width: 60,
  },
  profileSection: {
    alignItems: 'center',
    left: 20,
    position: 'absolute',
    top: '50%',
  },
  userCard: {
    borderRadius: 12,
    elevation: 3,
    marginBottom: 11,
    overflow: 'hidden',
    paddingBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    paddingHorizontal: 24,
  },
});

export default UserCard;
