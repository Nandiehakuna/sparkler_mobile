import { SparkleActivity } from '../utils/types';
import api from '../api/sparkles';
import expoPushNotificationsApi from '../api/expoPushNotifications';
import filesStorage from '../storage/files';
import reactionsApi from '../api/reactions';
import useUser from './useUser';

export default () => {
  const { user } = useUser();

  const checkIfHasResparkled = (activity: SparkleActivity): boolean => {
    let hasResparkled = false;

    if (activity?.own_reactions?.resparkle && user) {
      const myReaction = activity.own_reactions.resparkle.find((act) => act.user.id === user._id);
      hasResparkled = Boolean(myReaction);
    }

    return hasResparkled;
  };

  const checkIfHasLiked = (activity: SparkleActivity): boolean => {
    let hasLikedSparkle = false;

    if (activity?.own_reactions?.like && user) {
      const myReaction = activity.own_reactions.like.find((l) => l.user.id === user?._id);
      hasLikedSparkle = Boolean(myReaction);
    }

    return hasLikedSparkle;
  };

  const deleteSparkle = async (sparkle: SparkleActivity) => {
    const { attachments, id, quoted_activity, verb } = sparkle;
    const isAQuote = verb === 'quote';

    if (isAQuote) await reactionsApi.remove({ kind: verb, sparklerId: quoted_activity.id });

    await api.deleteSparkle(id);
    const images = attachments?.images || [];
    if (images.length) filesStorage.deleteImages(images);
  };

  const sendSparklePushNotifications = () => {
    const targetUsersId = Object.keys(user.followersId);
    const message = `${user.name} has just sparkled`;

    expoPushNotificationsApi.send({ message, targetUsersId });
  };

  const sparkle = async (data: { images: string[]; text: string }) => {
    const res = await api.createSparkle(data);

    if (res.ok) sendSparklePushNotifications();

    return res;
  };

  return { checkIfHasLiked, checkIfHasResparkled, deleteSparkle, sparkle };
};
