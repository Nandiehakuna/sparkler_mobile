import { Activity } from 'getstream';

import { ActivityActor, Comment, SparkleActivity } from '../utils/types';
import expoPushNotificationsApi from '../api/expoPushNotifications';
import reactionsApi from '../api/reactions';
import useUser from './useUser';
import useToast from './useToast';

const REACTION_KIND = 'comment';

export default () => {
  const { user } = useUser();
  const toast = useToast();

  const handleComment = async (sparkle: Activity | SparkleActivity, comment: string) => {
    const actorId = (sparkle.actor as unknown as ActivityActor).id;

    if (user) {
      const res = await reactionsApi.add({
        actorId,
        data: { text: comment },
        kind: REACTION_KIND,
        sparkleId: sparkle.id,
      });
      sendPushNotification(actorId, comment);

      return res;
    }
  };

  async function sendPushNotification(actorId: string, comment: string) {
    if (user?._id !== actorId)
      await expoPushNotificationsApi.send({
        title: `${user.name} commented on your sparkle`,
        message: comment,
        targetUsersId: [actorId],
      });
  }

  async function getSparkleComments(sparkleId: string) {
    const res = await reactionsApi.getOfSparkle(REACTION_KIND, sparkleId);

    if (!res.ok) toast.show('Could not retrieve comments at the moment', 'error');

    const data = res.ok
      ? (res.data as { next: string; results: Comment[]; activity: SparkleActivity })
      : { next: '', results: [], activity: null };

    return { ...data, ok: res.ok };
  }

  return { getSparkleComments, handleComment, sendPushNotification };
};
