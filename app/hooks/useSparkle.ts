import { SparkleActivity } from "../utils/types";

export default () => {
  const user = { _id: "" };

  const checkIfHasResparkled = (activity: SparkleActivity): boolean => {
    let hasResparkled = false;

    if (activity?.own_reactions?.resparkle && user) {
      const myReaction = activity.own_reactions.resparkle.find(
        (act) => act.user.id === user._id
      );
      hasResparkled = Boolean(myReaction);
    }

    return hasResparkled;
  };

  const checkIfHasLiked = (activity: SparkleActivity): boolean => {
    let hasLikedSparkle = false;

    if (activity?.own_reactions?.like && user) {
      const myReaction = activity.own_reactions.like.find(
        (l) => l.user.id === user?._id
      );
      hasLikedSparkle = Boolean(myReaction);
    }

    return hasLikedSparkle;
  };

  return { checkIfHasLiked, checkIfHasResparkled };
};
