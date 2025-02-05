import { Activity } from 'getstream';

import { ActivityActor, SparkleActivity } from '../utils/types';
import { Response } from '../api/client';
import expoPushNotificationsApi from '../api/expoPushNotifications';
import reactionsApi from '../api/reactions';
import useUser from './useUser';

const LIKE_REACTION = 'like';

export default () => {
  const { user } = useUser();

  async function likeChild(
    commentId: string,
    actorId: string,
    text: string
  ): Promise<Response | undefined> {
    if (!user) return;

    const response = await reactionsApi.addChild({
      kind: LIKE_REACTION,
      actorId: user?._id,
      parentId: commentId,
    });

    if (response && user?._id !== actorId)
      expoPushNotificationsApi.send({
        title: `${user?.name} liked your comment`,
        message: text,
        targetUsersId: [actorId],
      });

    return response;
  }

  async function toggleLike(
    sparkle: SparkleActivity | Activity,
    hasLiked: boolean,
    text?: string
  ): Promise<Response | undefined> {
    if (!user) return;

    const actorId = (sparkle.actor as unknown as ActivityActor).id;
    const response = await reactionsApi.toggle({
      actorId,
      done: hasLiked,
      kind: LIKE_REACTION,
      sparkleId: sparkle.id,
    });

    if (response && user?._id !== actorId)
      expoPushNotificationsApi.send({
        title: `${user?.name} liked your sparkle`,
        message: text,
        targetUsersId: [actorId],
      });

    return response;
  }

  return { likeChild, toggleLike };
};
