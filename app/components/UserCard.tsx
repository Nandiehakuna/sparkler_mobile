import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ActorName } from './sparkle';
import { UserButton } from './thread';
import { getActorFromUser } from '../utils/funcs';
import { useProfileUser, useTheme } from '../hooks';
import { User } from '../contexts/UsersContext';
import Avatar from './Avatar';
import colors from '../config/colors';
import Image from './Image';
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

  if (coverImage)
    return (
      <TouchableOpacity
        style={[styles.userCardWithCover, { backgroundColor: theme.colors.background }]}
        onPress={visitProfile}
      >
        <View style={styles.container}>
          <Image style={styles.coverImage} uri={coverImage} />
          <View style={styles.overlay} />
          <View style={styles.profileSectionWithCover}>
            <Avatar image={profileImage} style={styles.profileImageWithCover} />
          </View>
          <View style={styles.userInfoWithCover}>
            <View style={styles.followButton}>
              <UserButton userId={user._id} />
            </View>
            <ActorName
              onPress={visitProfile}
              actor={getActorFromUser(user)}
              time={user.timestamp}
            />
          </View>
          <View style={styles.bioContainerWithCover}>
            {Boolean(bio?.length) && (
              <Text style={styles.bio} numberOfLines={1}>
                {bio}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: theme.colors.background }]}
      onPress={visitProfile}
    >
      <View style={styles.container}>
        <Avatar image={profileImage} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <ActorName actor={getActorFromUser(user)} time={timestamp} onPress={visitProfile} />
          {Boolean(bio?.length) && (
            <Text style={styles.bio} numberOfLines={1}>
              {bio}
            </Text>
          )}
        </View>
        <View style={styles.followButton}>
          <UserButton userId={user._id} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bio: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 4,
  },
  bioContainerWithCover: {
    paddingHorizontal: 7,
    marginTop: 3,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  coverImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '50%',
    objectFit: 'cover',
    width: '100%',
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
    borderRadius: 25,
    height: 50,
    marginRight: 12,
    objectFit: 'cover',
    width: 50,
  },
  profileImageWithCover: {
    borderColor: colors.white,
    borderRadius: 30,
    height: 60,
    objectFit: 'cover',
    width: 60,
  },
  profileSectionWithCover: {
    position: 'absolute',
    top: '50%',
    left: 16,
    transform: [{ translateY: -30 }], // Centers the avatar
    alignItems: 'center',
  },
  userCard: {
    alignItems: 'center',
    borderRadius: 8,
    elevation: 1,
    flexDirection: 'row',
    padding: 12,
  },
  userCardWithCover: {
    borderRadius: 12,
    elevation: 3,
    height: 200,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfoWithCover: {
    paddingHorizontal: 24,
  },
  actorName: {
    marginBottom: 8,
  },
  followButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginTop: 5,
  },
});

export default UserCard;
