import { Activity } from 'getstream';

import { ActivityActor, Reaction, SparkleActivity } from '../utils/types';
import reactionsApi from '../api/reactions';
import useUser from './useUser';
import useReactions from './useReactions';
import useToast from './useToast';

const BOOKMARK_REACTION = 'bookmark';

export default () => {
  const { user } = useUser();
  const { getSparklesOfReactions } = useReactions();
  const toast = useToast();

  async function getBookmarkedSparkles(): Promise<SparkleActivity[]> {
    if (user) {
      const res = await reactionsApi.get(BOOKMARK_REACTION);
      if (!res.ok) return [];

      const { data, ok } = await getSparklesOfReactions(
        (res.data as { results: [] }).results as Reaction[]
      );
      if (!ok) toast.show('Error fetching your bookmarks! Try again later', 'error');

      return ok ? (data as SparkleActivity[]) : [];
    }
  }

  async function handleBookmark(sparkle: SparkleActivity | Activity, bookmarked: boolean) {
    if (user)
      return await reactionsApi.toggle({
        actorId: (sparkle.actor as unknown as ActivityActor).id,
        done: bookmarked,
        kind: BOOKMARK_REACTION,
        sparkleId: sparkle.id,
      });
  }

  const checkIfHasBookmarked = (activity: SparkleActivity): boolean => {
    let hasBookmarkedSparkle = false;

    if (activity?.own_reactions?.bookmark && user) {
      const myReaction = activity.own_reactions?.bookmark?.find((l) => l.user.id === user?._id);
      hasBookmarkedSparkle = Boolean(myReaction);
    }

    return hasBookmarkedSparkle;
  };

  return { checkIfHasBookmarked, getBookmarkedSparkles, handleBookmark };
};
