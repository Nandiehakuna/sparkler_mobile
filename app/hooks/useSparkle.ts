import { SparkleActivity } from '../utils/types';
import api from '../api/sparkles';
import filesStorage from '../storage/files';
import useUser from './useUser';

export default () => {
  const { user } = useUser();

  const checkIfHasResparkled = (activity: SparkleActivity): boolean => {
    let hasResparkled = false;

    if (activity?.own_reactions?.resparkle && user) {
      const myReaction = activity.own_reactions.resparkle.find(
        (act) => act.user.id === user._id,
      );
      hasResparkled = Boolean(myReaction);
    }

    return hasResparkled;
  };

  const checkIfHasLiked = (activity: SparkleActivity): boolean => {
    let hasLikedSparkle = false;

    if (activity?.own_reactions?.like && user) {
      const myReaction = activity.own_reactions.like.find(
        (l) => l.user.id === user?._id,
      );
      hasLikedSparkle = Boolean(myReaction);
    }

    return hasLikedSparkle;
  };

  const deleteSparkle = async (sparkle: SparkleActivity) => {
    await api.deleteSparkle(sparkle.id);
    const images = sparkle?.attachments?.images || [];
    if (images.length) filesStorage.deleteImages(images);
  };

  return { checkIfHasLiked, checkIfHasResparkled, deleteSparkle };
};
