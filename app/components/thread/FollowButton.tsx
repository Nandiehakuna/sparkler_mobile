import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { useFollow, useUser } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  userId: string;
}

const FollowButton = ({ userId }: Props) => {
  const { isFollowing, toggleFollow } = useFollow({ userId });
  const { user } = useUser();

  const isTheSamePerson = user._id === userId;

  if (isTheSamePerson) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleFollow}
        style={[
          styles.button,
          isFollowing ? styles.following : styles.notFollowing,
        ]}
      >
        <Text
          style={[
            styles.text,
            isFollowing ? styles.followingText : styles.notFollowingText,
          ]}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  notFollowing: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  following: {
    backgroundColor: 'transparent',
    borderColor: '#657786',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  notFollowingText: {
    color: colors.white,
  },
  followingText: {
    color: '#657786',
  },
  loader: {
    color: colors.blue,
    marginRight: 5,
    marginTop: 2,
  },
});

export default FollowButton;
