import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ActorName } from '../sparkle';
import { BookmarkIcon, CommentIcon, LikeIcon } from '../icons';
import { Comment as CommentType, Reply } from '../../utils/types';
import { ReactionId, SparkleReactors } from '../sparkle/Sparkle';
import { routes } from '../../navigation';
import {
  useBookmark,
  useLike,
  useNavigation,
  useProfileUser,
  useTheme,
  useToast,
  useUser,
} from '../../hooks';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import Comment from './Comment';
import reactionsApi from '../../api/reactions';
import SparkleText from '../sparkle/SparkleText';
import Text from '../Text';

interface Props extends CommentType {
  action?: string;
  parentUsername: string;
}

export default (comment: Props) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [replyCount, setReplyCount] = useState(0);
  const [replies, setReplies] = useState<Reply[]>([]);
  const { theme } = useTheme();
  const { viewProfile } = useProfileUser();
  const { user: currentUser } = useUser();
  const bookmarkHelper = useBookmark();
  const likeHelper = useLike();
  const toast = useToast();
  const navigation = useNavigation();

  const {
    action = 'Comment',
    id,
    user,
    data,
    created_at,
    parentUsername,
    children_counts,
    own_children,
    kind,
  } = comment;
  const text = data?.text || '';

  useEffect(() => {
    setHasBookmarked(hasBookmarkedComment());
    setHasLiked(hasLikedComment());
    setLikeCount(children_counts?.like || 0);
    setReplyCount(children_counts?.reply || 0);
    setReplies(own_children?.reply || []);
  }, []);

  const reactions: SparkleReactors[] = [
    {
      id: 'comment',
      Icon: <CommentIcon size={19} />,
      value: replyCount,
      onPress: () => navigation.navigate(routes.REPLY, comment),
    },
    {
      id: 'like',
      Icon: <LikeIcon liked={hasLiked} />,
      value: likeCount,
      onPress: toggleLike,
    },
    {
      id: 'bookmark',
      Icon: <BookmarkIcon bookmarked={hasBookmarked} />,
      onPress: toggleBookmark,
    },
  ];

  function getUserReaction(kind: 'like' | 'bookmark') {
    return own_children?.[kind]?.find((reaction) => reaction.user_id === currentUser._id);
  }

  function getUserBookmark() {
    return getUserReaction('bookmark');
  }

  function getUserLike() {
    return getUserReaction('like');
  }

  function hasLikedComment(): boolean {
    if (!currentUser) return false;

    return Boolean(getUserLike());
  }

  function hasBookmarkedComment(): boolean {
    if (!currentUser) return false;

    return Boolean(getUserBookmark());
  }

  function unlikeComment() {
    const likeId = getUserLike()?.id;

    if (likeId) return reactionsApi.removeChild(likeId);
  }

  function unbookmarkComment() {
    const bookmarkId = getUserBookmark()?.id;

    if (bookmarkId) return reactionsApi.removeChild(bookmarkId);
  }

  async function toggleBookmark() {
    const bookmarked = hasBookmarked;
    setHasBookmarked(!hasBookmarked);

    if (!currentUser) return toast.show('Login to save your bookmark', 'success');

    const res = bookmarked ? await unbookmarkComment() : await bookmarkHelper.bookmarkChild(id);

    if (!res?.ok) {
      setHasBookmarked(bookmarked);
      toast.show(`Error ${bookmarked ? 'unbookmarking' : 'bookmarking'} a comment`, 'error');
    }
  }

  async function toggleLike() {
    const liked = hasLiked;
    let count = likeCount;
    setLikeCount(hasLiked ? (count -= 1) : (count += 1));
    setHasLiked(!hasLiked);

    if (!currentUser) return toast.show('Login to save your like', 'success');

    const res = liked ? await unlikeComment() : await likeHelper.likeChild(id, user.id, text);

    if (!res?.ok) {
      setLikeCount(count);
      setHasLiked(liked);
      toast.show(`Error ${liked ? 'unliking' : 'liking'} a sparkle`, 'error');
    }
  }

  function getColor(id: ReactionId): string {
    let color: string = !theme.dark ? colors.medium : colors.white;

    if (id === 'like' && hasLiked) color = colors.primary;
    else if (id === 'bookmark' && hasBookmarked) color = colors.blue;

    return color;
  }

  const visitProfile = () => viewProfile(user);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Avatar image={user.data.profileImage} onPress={visitProfile} style={styles.profileImage} />

      <View style={styles.contentContainer}>
        <ActorName actor={user} time={created_at} onPress={visitProfile} />
        <SparkleText text={`${action}ing on @${parentUsername}`} onReadMore={() => {}} />
        <View style={styles.textContainer}>
          <SparkleText text={text} onReadMore={() => {}} textLimit={1_000} />
        </View>

        {kind === 'comment' && (
          <View style={styles.reactionsContainer}>
            {reactions.map(({ Icon, id, value, onPress }, index) => (
              <TouchableOpacity key={index} style={styles.reactionButton} onPress={onPress}>
                {Icon}
                {Boolean(value) && (
                  <Text style={[styles.reactionCount, { color: getColor(id) }]}>{value}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <FlatList
          data={showReplies ? replies : []}
          keyExtractor={(reply) => reply.id}
          renderItem={({ item }) => (
            <Comment
              {...(item as unknown as CommentType)}
              parentUsername={`${parentUsername} and @${user.data.username}`}
              action="Reply"
            />
          )}
        />

        {replyCount > 0 && (
          <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
            <Text isBold style={styles.repliesText}>
              {showReplies ? 'Hide' : 'Show'} replies
            </Text>
          </TouchableOpacity>
        )}
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
    borderRadius: 20,
    height: 40,
    marginRight: 8,
    width: 40,
  },
  reactionButton: {
    alignItems: 'center',
    flexDirection: 'row',
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
  repliesText: {
    color: colors.blue,
    marginTop: 4,
  },
  textContainer: {
    marginTop: 4,
  },
});
