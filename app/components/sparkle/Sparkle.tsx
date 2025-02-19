import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Activity } from 'getstream';

import { appUrl } from '../../api/client';
import { BookmarkIcon, CommentIcon, LikeIcon, ResparkleIcon, UploadIcon } from '../icons';
import { describeProject, ProjectData } from '../../hooks/useProjects';
import { generateSparkleLink } from '../../utils/funcs';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ProjectIcon } from '../project';
import { routes } from '../../navigation';
import { SparkleActivity } from '../../utils/types';
import {
  useLike,
  useUser,
  useNavigation,
  useSparkle,
  useBookmark,
  useProfileUser,
  useToast,
} from '../../hooks';
import ActorName from './ActorName';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import EmbeddedSparkle from './EmbeddedSparkle';
import ResparkleOptions from './ResparkleOptions';
import ShareSparkleOptions from './ShareSparkleOptions';
import SparkleActionsModal from './SparkleActionsModal';
import SparkleImage from './SparkleImage';
import SparkleText from './SparkleText';
import Text from '../Text';
import useTheme from '../../hooks/useTheme';

export type ReactionId = 'bookmark' | 'comment' | 'resparkle' | 'like' | 'upload';

export type SparkleReactors = {
  id: ReactionId;
  Icon: JSX.Element;
  value?: number;
  onPress: VoidFunction;
};

export const MAX_NO_OF_LINES = 4;

interface Props {
  activity: Activity;
  currentProfileScreen?: ProfileScreen;
}

export default ({ activity, currentProfileScreen }: Props) => {
  const [showResparkleOptions, setShowResparkleOptions] = useState(false);
  const [hasResparkled, setHasResparkled] = useState(false);
  const [hasBookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showSparkleActions, setShowSparkleActions] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [resparkleCount, setResparkleCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const { theme } = useTheme();
  const { toggleLike } = useLike();
  const { user } = useUser();
  const { viewProfile } = useProfileUser();
  const bookmarkHelper = useBookmark();
  const navigation = useNavigation();
  const toast = useToast();

  const isAReaction = activity.foreign_id.startsWith('reaction');
  const originalSparkleActivity = isAReaction
    ? (activity.object as unknown as SparkleActivity)
    : (activity as unknown as SparkleActivity);
  const { actor, object, time, quoted_activity, attachments, reaction_counts } =
    originalSparkleActivity;
  const isAQuote = activity.verb === 'quote';
  const isAProject = activity.verb === 'project';
  const appActivity = activity as unknown as SparkleActivity;
  const images: string[] = isAProject ? [] : attachments?.images || [];
  const text: string = isAProject
    ? describeProject(object?.data as unknown as ProjectData)
    : (object?.data || { text: '' }).text;
  const sparkleLink = generateSparkleLink(actor.data.username, activity.id);

  useEffect(() => {
    setHasResparkled(checkIfHasResparkled(appActivity));
    setHasLiked(checkIfHasLiked(appActivity));
    setBookmarked(bookmarkHelper.checkIfHasBookmarked(appActivity));
    setResparkleCount(reaction_counts?.resparkle || 0);
    setLikeCount(reaction_counts?.like || 0);
    setBookmarkCount(reaction_counts?.bookmark || 0);
  }, []);

  const reactions: SparkleReactors[] = [
    {
      id: 'comment',
      Icon: <CommentIcon size={19} />,
      value: reaction_counts?.comment || 0,
      onPress: () =>
        navigation.navigate(routes.COMMENT, {
          activity: originalSparkleActivity,
        }),
    },
    {
      id: 'resparkle',
      Icon: <ResparkleIcon resparkled={hasResparkled} />,
      value: resparkleCount,
      onPress: () => setShowResparkleOptions(true),
    },
    {
      id: 'like',
      Icon: <LikeIcon liked={hasLiked} />,
      value: likeCount,
      onPress: handleLikeToggle,
    },
    {
      id: 'upload',
      Icon: <UploadIcon />,
      onPress: () => setShowShareOptions(true),
    },
    {
      id: 'bookmark',
      Icon: <BookmarkIcon bookmarked={hasBookmarked} />,
      onPress: handleBookmark,
    },
  ];

  const getResparklerName = (): string => {
    const { actor } = activity as unknown as SparkleActivity;
    const isSparkler = user?._id === actor.id || hasResparkled;
    const actorName = actor.data.name;

    return isSparkler ? 'You' : actorName;
  };

  const visitProfile = () => viewProfile(actor);

  const viewThread = () => navigation.navigate(routes.THREAD, originalSparkleActivity);

  function getColor(id: ReactionId): string {
    let color: string = !theme.dark ? colors.medium : colors.white;

    if (id === 'like' && hasLiked) color = colors.primary;
    else if (id === 'resparkle' && hasResparkled) color = colors.green;
    else if (id === 'bookmark' && hasBookmarked) color = colors.blue;

    return color;
  }

  async function handleBookmark() {
    const originalBookmarkStatus = hasBookmarked;
    const originalBookmarkCount = bookmarkCount;
    setBookmarked(!hasBookmarked);
    setBookmarkCount((count) => (hasBookmarked ? (count -= 1) : (count += 1)));

    if (!user) return toast.show('Login to save this sparkle', 'success');

    const res = await bookmarkHelper.handleBookmark(activity, originalBookmarkStatus);

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

  async function handleLikeToggle() {
    const liked = hasLiked;
    let count = likeCount;
    setLikeCount(hasLiked ? (count -= 1) : (count += 1));
    setHasLiked(!hasLiked);

    if (!user) return toast.show('Login to save your like', 'success');

    const res = await toggleLike(activity, liked, text);

    if (!res?.ok) {
      setLikeCount(count);
      setHasLiked(liked);
      console.log('Error toggling like');
    }
  }

  if (
    (currentProfileScreen === 'media' && !images.length) ||
    (currentProfileScreen === 'projects' && !isAProject)
  )
    return null;

  return (
    <TouchableOpacity
      onPress={viewThread}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.headerSection, styles.headerContainer]}>
        {isAProject && (
          <View style={[styles.headerSection, styles.reactionSection]}>
            <ProjectIcon size={20} />
            <Text style={styles.projectText} isBold>
              Project
            </Text>
          </View>
        )}

        {(isAReaction || hasResparkled) && (
          <View style={[styles.headerSection, styles.reactionSection]}>
            <ResparkleIcon resparkled={false} size={18} />
            <Text
              style={[styles.resparkleText, { color: !theme.dark ? colors.medium : colors.white }]}
              isBold
            >
              <Text isBold>{getResparklerName()}</Text> resparkled
            </Text>
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Avatar
          style={styles.profileImage}
          image={actor.data.profileImage}
          onPress={visitProfile}
        />
        <View style={styles.contentContainer}>
          <ActorName
            actor={actor}
            onMoreIconPress={() => setShowSparkleActions(true)}
            onPress={visitProfile}
            showMoreIcon
            time={time}
          />

          <SparkleText onReadMore={viewThread} text={text} />

          <SparkleImage images={images} />

          {isAQuote && quoted_activity && <EmbeddedSparkle activity={quoted_activity} />}

          <View style={styles.reactionsContainer}>
            {reactions.map(({ id, Icon, value, onPress }, index) => (
              <TouchableOpacity key={index} style={styles.reactionButton} onPress={onPress}>
                {Icon}
                {Boolean(value) && (
                  <Text style={[styles.reactionCount, { color: getColor(id) }]}>{value}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <SparkleActionsModal
        onClose={() => setShowSparkleActions(false)}
        visible={showSparkleActions}
        actorId={actor.id}
        sparkle={activity as unknown as SparkleActivity}
      />

      <ShareSparkleOptions
        onClose={() => setShowShareOptions(false)}
        isOpen={showShareOptions}
        sparkleUrl={`${appUrl}${sparkleLink}`}
        text={text}
      />

      <ResparkleOptions
        activity={activity}
        onClose={() => setShowResparkleOptions(false)}
        hasResparkled={hasResparkled}
        visible={showResparkleOptions}
        ontoggleResparkle={toggleResparkle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.9,
    borderBlockColor: colors.light,
  },
  contentContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  projectText: {
    marginLeft: 5,
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
  headerSection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 45,
    paddingTop: 5,
  },
  reactionSection: {
    marginLeft: 5,
  },
  resparkleText: {
    fontSize: 14,
    marginLeft: 5,
  },
  text: {
    fontSize: 15,
    color: colors.medium,
    letterSpacing: 0.1,
    lineHeight: 20,
    flexWrap: 'wrap',
    overflow: 'hidden',
    width: '100%',
  },
});
