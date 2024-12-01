import useUser from "./useUser";
import useStreamClient from "./useStreamClient";

const REACTION = "resparkle";

export default () => {
  const { user } = useUser();
  const client = useStreamClient();

  const getReactionId = async (activityId: string, reactionType: string) => {
    if (!client || !user) return null;

    try {
      const reactions = await client.reactions.filter({
        activity_id: activityId,
        kind: reactionType,
      });

      const userReaction = reactions.results.find(
        (reaction) => reaction.user_id === user._id
      );

      return userReaction?.id || null;
    } catch (error) {
      console.error("Error fetching reactions:", error);
      return null;
    }
  };

  const toggleResparkle = async (
    sparkle: { id: string },
    hasResparkled: boolean
  ) => {
    if (!user) return;

    const reactionId = await getReactionId(sparkle.id, REACTION);

    if (hasResparkled) reactionId && client?.reactions.delete(reactionId);
    else client?.reactions.add(REACTION, sparkle);
  };

  return { toggleResparkle };
};
