import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { appUrl } from '../api/client';
import {
  BookmarkIcon,
  CommentIcon,
  LikeIcon,
  ResparkleIcon,
  UploadIcon,
} from '../components/icons';
import {
  EmbeddedSparkle,
  SparkleImage,
  ResparkleOptions,
  ShareSparkleOptions,
} from '../components/sparkle';
import { Comment as CommentBlock, UserButton } from '../components/thread';
import { Avatar, EndOfListIndicator, ItemSeparator, Text } from '../components';
import { Comment, ScreenProps, SparkleActivity } from '../utils/types';
import { describeProject, ProjectData } from '../hooks/useProjects';
import { generateSparkleLink, isDeletedSparkle } from '../utils/funcs';
import { getThreadTime } from '../utils/time';
import { SparkleReactors } from '../components/sparkle/Sparkle';
import { ProjectIcon } from '../components/project';
import { routes } from '../navigation';
import {
  useComment,
  useLike,
  useProfileUser,
  useUser,
  useSparkle,
  useBookmark,
  useToast,
  useTheme,
} from '../hooks';
import colors from '../config/colors';
import SparkleText from '../components/sparkle/SparkleText';

export default ({ navigation, route }: ScreenProps) => {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [comment, setComment] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasBookmarked, setBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasResparkled, setHasResparkled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [resparkleCount, setResparkleCount] = useState(0);
  const [showResparkleOptions, setShowResparkleOptions] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const { theme } = useTheme();
  const { toggleLike } = useLike();
  const { user } = useUser();
  const { viewProfile } = useProfileUser();
  const bookmarkHelper = useBookmark();
  const commentHandler = useComment();
  const toast = useToast();

  const sparkle: SparkleActivity | undefined = route.params as SparkleActivity;
  const sparkleLink = generateSparkleLink(sparkle.actor.data.username, sparkle.id);
  const wasDeleted: boolean = isDeletedSparkle(sparkle);

  useEffect(() => {
    const initComments = async () => {
      setLoadingComments(true);
      setComments(await commentHandler.getSparkleComments(sparkle.id));
      setLoadingComments(false);
    };

    initComments();
  }, []);

  useEffect(() => {
    if (!sparkle || wasDeleted) return;

    setHasResparkled(checkIfHasResparkled(sparkle));
    setResparkleCount(reaction_counts?.resparkle || 0);
    setLikeCount(reaction_counts?.like || 0);
    setBookmarkCount(reaction_counts?.bookmark || 0);
    setCommentCount(reaction_counts?.comment || 0);
    setHasLiked(checkIfHasLiked(sparkle));
    setBookmarked(bookmarkHelper.checkIfHasBookmarked(sparkle));
  }, []);

  if (!sparkle) {
    navigation.navigate(routes.HOME_NAVIGATOR);
    return null;
  }

  const { actor, attachments, object, time, reaction_counts, quoted_activity, verb } = sparkle;
  const isAQuote = verb === 'quote';
  const quotesCount = reaction_counts?.quote || 0;
  const images: string[] = attachments?.images || [];
  const buttonDisabled = !comment.length || loading;
  const hasALike = likeCount > 0;
  const hasAComment = commentCount > 0;
  const hasAResparkle = resparkleCount > 0;
  const hasAQuote = quotesCount > 0;
  const hasABookmark = bookmarkCount > 0;
  const isAProject = sparkle.verb === 'project';
  const text: string = isAProject
    ? describeProject(object?.data as unknown as ProjectData)
    : (object?.data || { text: '' }).text;

  const reactions: SparkleReactors[] = [
    {
      id: 'comment',
      Icon: <CommentIcon size={22} />,
      value: commentCount,
      onPress: () =>
        navigation.navigate(routes.COMMENT, {
          activity: sparkle,
        }),
    },
    {
      id: 'resparkle',
      Icon: <ResparkleIcon resparkled={hasResparkled} size={22} />,
      value: resparkleCount,
      onPress: () => setShowResparkleOptions(true),
    },
    {
      id: 'like',
      Icon: <LikeIcon liked={hasLiked} size={22} />,
      value: likeCount,
      onPress: handleLikeToggle,
    },
    {
      id: 'upload',
      Icon: <UploadIcon size={20} />,
      onPress: () => setShowShareOptions(true),
    },
    {
      id: 'bookmark',
      Icon: <BookmarkIcon bookmarked={hasBookmarked} />,
      value: bookmarkCount,
      onPress: handleBookmark,
    },
  ];

  async function handleBookmark() {
    const originalBookmarkStatus = hasBookmarked;
    const originalBookmarkCount = bookmarkCount;
    setBookmarkCount((count) => (hasBookmarked ? (count -= 1) : (count += 1)));
    setBookmarked(!hasBookmarked);

    if (!user) return;

    const res = await bookmarkHelper.handleBookmark(sparkle, originalBookmarkStatus);

    if (!res?.ok) {
      setBookmarked(originalBookmarkStatus);
      setBookmarkCount(originalBookmarkCount);
      console.log(`Error ${originalBookmarkStatus ? 'removing' : 'adding'} a bookmark`);
    }
  }

  const toggleResparkle = (resparkled: boolean) => {
    setHasResparkled(resparkled);

    let count = resparkleCount;
    setResparkleCount(resparkled ? (count += 1) : (count -= 1));
  };

  const handleComment = async () => {
    if (!user || buttonDisabled) return;

    setLoading(true);
    const res = await commentHandler.handleComment(sparkle, comment);
    setLoading(false);

    if (!res.ok) toast.show('Comment could not be sent', 'error');
    else {
      toast.show('Comment sent successfully', 'success');
      setComments([res.data as Comment, ...comments]);
    }
  };

  async function handleLikeToggle() {
    if (!sparkle) return;

    const liked = hasLiked;
    let count = likeCount;
    setLikeCount(hasLiked ? (count -= 1) : (count += 1));
    setHasLiked(!hasLiked);

    const res = await toggleLike(sparkle, liked);
    if (!res?.ok) {
      setLikeCount(count);
      console.log('Error toggling like');
    }
  }

  const visitProfile = () => viewProfile(actor);

  if (wasDeleted)
    return (
      <View>
        <Text style={styles.deletedInfo}>This sparkle was deleted</Text>
      </View>
    );

  const { id, isAdmin, name, username, verified } = actor.data;

  const Header = (
    <View>
      <TouchableOpacity style={styles.profileSection} onPress={visitProfile}>
        <Avatar image={actor.data.profileImage} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.name} isBold>
              {name}
            </Text>
            {verified && (
              <Image
                source={
                  isAdmin
                    ? require('../assets/admin-verification.png')
                    : require('../assets/verified.png')
                }
                style={styles.verificationIcon}
              />
            )}
          </View>
          <Text style={styles.username}>@{username}</Text>
        </View>
        <UserButton userId={id} />
      </TouchableOpacity>

      <View style={styles.contentSection}>
        {isAProject && (
          <View style={styles.projectSection}>
            <ProjectIcon size={20} />
            <Text style={styles.projectText} isBold>
              Project
            </Text>
          </View>
        )}

        <SparkleText text={text} onReadMore={() => {}} textLimit={1_000} />
        <SparkleImage images={images} />

        {isAQuote && quoted_activity && <EmbeddedSparkle activity={quoted_activity} />}

        <Text style={styles.timestamp}>{getThreadTime(time)}</Text>
      </View>

      {(hasALike || hasAComment || hasAResparkle || hasAQuote || hasABookmark) && (
        <View style={styles.reactionsSection}>
          {hasALike && (
            <Text style={styles.reaction}>
              {likeCount} Like{likeCount === 1 ? '' : 's'}
            </Text>
          )}
          {hasAComment && (
            <Text style={styles.reaction}>
              {commentCount} Comment{commentCount === 1 ? '' : 's'}
            </Text>
          )}
          {hasAResparkle && (
            <Text style={styles.reaction}>
              {resparkleCount} Resparkle{resparkleCount === 1 ? '' : 's'}
            </Text>
          )}
          {quotesCount > 0 && (
            <Text style={styles.reaction}>
              {quotesCount} Quote{quotesCount === 1 ? '' : 's'}
            </Text>
          )}
          {bookmarkCount > 0 && (
            <Text style={styles.reaction}>
              {bookmarkCount} Bookmark{bookmarkCount === 1 ? '' : 's'}
            </Text>
          )}
        </View>
      )}

      <View style={styles.iconsSection}>
        {reactions.map(({ id, Icon, onPress }) => (
          <TouchableOpacity key={id} onPress={onPress} style={styles.reactionButton}>
            {Icon}
          </TouchableOpacity>
        ))}
      </View>

      <ShareSparkleOptions
        onClose={() => setShowShareOptions(false)}
        isOpen={showShareOptions}
        sparkleUrl={`${appUrl}${sparkleLink}`}
        text={object.data?.text}
      />

      <ResparkleOptions
        activity={sparkle}
        hasResparkled={hasResparkled}
        onClose={() => setShowResparkleOptions(false)}
        ontoggleResparkle={toggleResparkle}
        visible={showResparkleOptions}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={comments}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(comment) => comment.id}
        ListHeaderComponent={Header}
        renderItem={({ item }) => <CommentBlock {...item} />}
        ListFooterComponent={<EndOfListIndicator isLoading={loadingComments} />}
      />

      <View style={styles.commentSection}>
        <TextInput
          style={[styles.commentInput, { color: theme.colors.text }]}
          placeholder="Write a comment..."
          placeholderTextColor={theme.colors.text}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.commentButton,
            { backgroundColor: buttonDisabled ? colors.light : colors.blue },
          ]}
          onPress={handleComment}
          disabled={!comment}
        >
          <Text style={styles.commentButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentSection: {
    padding: 15,
    paddingTop: 0,
  },
  deletedInfo: {
    marginVertical: 20,
    textAlign: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileDetails: {
    flex: 1,
  },
  projectSection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 7,
  },
  projectText: {
    marginLeft: 5,
  },
  username: {
    fontSize: 14,
    color: colors.medium,
  },
  verificationIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.medium,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: colors.medium,
  },
  reactionsSection: {
    borderBottomColor: colors.light,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: colors.light,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  iconsSection: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  reaction: {
    fontSize: 14,
    color: '#657786',
  },
  reactionButton: {
    alignItems: 'center',
    flex: 1,
  },
  commentSection: {
    alignItems: 'center',
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    borderTopColor: colors.light,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  commentInput: {
    flex: 1,
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.light,
    marginRight: 10,
  },
  commentButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  commentButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
});
