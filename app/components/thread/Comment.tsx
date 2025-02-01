import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ActorName } from '../sparkle';
import { BookmarkIcon, CommentIcon, LikeIcon, ResparkleIcon, UploadIcon } from '../icons';
import { Comment } from '../../utils/types';
import { MAX_NO_OF_LINES, SparkleReactors } from '../sparkle/Sparkle';
import { useProfileUser, useTheme, useToast } from '../../hooks';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import Text from '../Text';

export default ({ user, data, created_at }: Comment) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const { theme } = useTheme();
  const { viewProfile } = useProfileUser();
  const toast = useToast();

  const reactions: SparkleReactors[] = [
    {
      id: 'comment',
      Icon: <CommentIcon color={colors.light} size={19} />,
      value: 0,
      onPress: notifyReactionDisable,
    },
    {
      id: 'resparkle',
      Icon: <ResparkleIcon inactive resparkled={false} />,
      value: 0,
      onPress: notifyReactionDisable,
    },
    {
      id: 'like',
      Icon: <LikeIcon inactive liked={false} />,
      value: 0,
      onPress: notifyReactionDisable,
    },
    {
      id: 'upload',
      Icon: <UploadIcon inactive />,
      onPress: notifyReactionDisable,
    },
    {
      id: 'bookmark',
      Icon: <BookmarkIcon color={colors.light} bookmarked={false} />,
      onPress: notifyReactionDisable,
    },
  ];

  function notifyReactionDisable() {
    toast.show('Comment reaaction is disabled', 'success');
  }

  const visitProfile = () => viewProfile(user);

  const handleTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > MAX_NO_OF_LINES) setIsTruncated(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Avatar image={user.data.profileImage} onPress={visitProfile} style={styles.profileImage} />

      <View style={styles.contentContainer}>
        <ActorName actor={user} time={created_at} onPress={visitProfile} />

        <Text
          style={styles.text}
          numberOfLines={isExpanded ? undefined : MAX_NO_OF_LINES}
          onTextLayout={handleTextLayout}
        >
          {data?.text}
        </Text>

        {isTruncated && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.readMore} isBold>
              {isExpanded ? 'Show less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.reactionsContainer}>
          {reactions.map(({ id, Icon, value, onPress }, index) => (
            <TouchableOpacity key={index} style={styles.reactionButton} onPress={onPress}>
              {Icon}
              {Boolean(value) && (
                <Text style={[styles.reactionCount, { color: colors.light }]}>{value}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBlockColor: colors.light,
    flexDirection: 'row',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionCount: {
    marginLeft: 5,
    fontSize: 14,
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  readMore: {
    color: colors.blue,
    fontSize: 14,
    marginTop: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    flexWrap: 'wrap',
    overflow: 'hidden',
    width: '100%',
  },
});
