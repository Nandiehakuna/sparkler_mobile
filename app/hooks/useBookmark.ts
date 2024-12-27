import { Activity } from 'getstream';

import { ActivityActor, SparkleActivity } from '../utils/types';
import reactionsApi from '../api/reactions';
import useUser from './useUser';

const BOOKMARK_REACTION = 'bookmark';

export default () => {
  const { user } = useUser();

  async function handleBookmark(
    sparkle: SparkleActivity | Activity,
    bookmarked: boolean,
  ) {
    if (user)
      return await reactionsApi.toggle({
        actorId: (sparkle.actor as unknown as ActivityActor).id,
        done: bookmarked,
        kind: BOOKMARK_REACTION,
        sparkleId: sparkle.id,
      });
  }

  return { handleBookmark };
};
