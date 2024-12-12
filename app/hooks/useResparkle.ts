import { Activity } from "getstream";

import { ActivityActor, SparkleActivity } from "../utils/types";
import { Response } from "../api/client";
import useUser from "./useUser";
import service from "../api/reactions";

const REACTION = "resparkle";

export default () => {
  const { user } = useUser();

  const toggleResparkle = async (
    sparkle: SparkleActivity | Activity,
    hasResparkled: boolean
  ): Promise<Response | undefined> => {
    if (user)
      return service.toggle({
        actorId: (sparkle.actor as unknown as ActivityActor).id,
        done: hasResparkled,
        kind: REACTION,
        sparkleId: sparkle.id,
      });
  };

  return { toggleResparkle };
};
