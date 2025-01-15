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

interface Props {
  user: User;
  onPress?: () => void;
}

const UserCard = ({ onPress, user }: Props) => {
  const { theme } = useTheme();
  const { viewProfile } = useProfileUser();

  const { profileImage, bio, timestamp, coverImage } = user;

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

  return (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: getBackgroundColor() }]}
      onPress={visitProfile}
    >
      <View>
        <RnImage style={styles.coverImage} source={getCoverImage()} />
        <View style={styles.overlay} />
        <View style={styles.profileSection}>
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
            <Text style={styles.bio} numberOfLines={1}>
              {bio}
            </Text>
          )}
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
  },
  bioContainer: {
    paddingHorizontal: 7,
    marginTop: 3,
  },
  coverImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '55%',
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
    position: 'absolute',
    top: '50%',
    left: 20,
    transform: [{ translateY: -20 }], // Centers the avatar
    alignItems: 'center',
  },
  userCard: {
    borderRadius: 12,
    elevation: 3,
    height: 200,
    marginBottom: 11,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    paddingHorizontal: 24,
  },
});

export default UserCard;
