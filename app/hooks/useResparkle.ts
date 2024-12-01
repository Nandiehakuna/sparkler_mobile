import { Response } from "../services/client";
import { SparkleActivity } from "../utils/types";
import useUser from "./useUser";
import service from "../services/reactions";

const REACTION = "resparkle";

export default () => {
  const { user } = useUser();

  const toggleResparkle = async (
    sparkle: SparkleActivity,
    hasResparkled: boolean
  ): Promise<Response | undefined> => {
    if (!user) return;

    return service.resparkle({
      actorId: sparkle.actor.id,
      hasResparkled,
      kind: REACTION,
      sparkleId: sparkle.id,
    });
  };

  return { toggleResparkle };
};
