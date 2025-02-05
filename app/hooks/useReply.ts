import { Comment } from '../utils/types';
import { Response } from '../api/client';
import expoPushNotificationsApi from '../api/expoPushNotifications';
import reactionsApi from '../api/reactions';
import useUser from './useUser';
import useThreadSparkle from './useThreadSparkle';

const REACTION_KIND = 'reply';

export default () => {
  const { user } = useUser();
  const { threadSparkle } = useThreadSparkle();

  const handleReply = async (comment: Comment, reply: string): Promise<Response | undefined> => {
    if (!user) return;

    const actorId = comment.user_id;

    const res = await reactionsApi.addChild({
      actorId,
      kind: REACTION_KIND,
      parentId: comment.id,
      data: { text: reply },
    });

    sendPushNotificationToCommenter(actorId, reply);
    sendPushNotificationToSparkler(reply);

    return res;
  };

  function sendPushNotificationToSparkler(reply: string) {
    const sparklerId = threadSparkle?.actor?.id;
    if (!sparklerId) return;

    if (user && sparklerId !== user._id) {
      expoPushNotificationsApi.send({
        title: `${user.name} replied to a comment on your sparkle`,
        message: reply,
        targetUsersId: [sparklerId],
      });
    }
  }

  function sendPushNotificationToCommenter(actorId: string, reply: string) {
    if (user && user?._id !== actorId)
      expoPushNotificationsApi.send({
        title: `${user.name} replied on your comment`,
        message: reply,
        targetUsersId: [actorId],
      });
  }

  return { handleReply };
};
