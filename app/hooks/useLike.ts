import { Activity } from 'getstream';

import { ActivityActor, SparkleActivity } from '../utils/types';
import { Response } from '../api/client';
import service from '../api/reactions';
import useUser from './useUser';

const LIKE_REACTION = 'like';

export default () => {
  const { user } = useUser();

  async function toggleLike(
    sparkle: SparkleActivity | Activity,
    hasLiked: boolean,
  ): Promise<Response | undefined> {
    if (user)
      return await service.toggle({
        actorId: (sparkle.actor as unknown as ActivityActor).id,
        done: hasLiked,
        kind: LIKE_REACTION,
        sparkleId: sparkle.id,
      });
  }

  return { toggleLike };
};
