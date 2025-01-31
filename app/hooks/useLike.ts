import { Activity } from 'getstream';

import { ActivityActor, SparkleActivity } from '../utils/types';
import { Response } from '../api/client';
import expoPushNotificationsApi from '../api/expoPushNotifications';
import service from '../api/reactions';
import useUser from './useUser';

const LIKE_REACTION = 'like';

export default () => {
  const { user } = useUser();

  async function toggleLike(
    sparkle: SparkleActivity | Activity,
    hasLiked: boolean
  ): Promise<Response | undefined> {
    if (user) {
      const actorId = (sparkle.actor as unknown as ActivityActor).id;
      const response = await service.toggle({
        actorId,
        done: hasLiked,
        kind: LIKE_REACTION,
        sparkleId: sparkle.id,
      });

      if (response && user?._id !== actorId)
        expoPushNotificationsApi.send({
          message: `${user?.name} liked your sparkle`,
          targetUsersId: [actorId],
        });

      return response;
    }
  }

  return { toggleLike };
};
