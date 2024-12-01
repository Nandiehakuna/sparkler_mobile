import { SparkleActivity } from "../utils/types";
import useUser from "./useUser";
import service from "../services/reactions";
import useStreamClient from "./useStreamClient";

const REACTION = "resparkle";

export default () => {
  const { user } = useUser();
  const client = useStreamClient();

  const toggleResparkle = async (
    sparkle: SparkleActivity,
    hasResparkled: boolean
  ) => {
    if (!user) return;

    await service.resparkle({
      actorId: sparkle.actor.id,
      hasResparkled,
      kind: REACTION,
      sparkleId: sparkle.id,
    });

    // Reload the feed
  };

  return { toggleResparkle };
};
