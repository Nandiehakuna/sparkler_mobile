import { Activity } from "getstream";

import { ActivityActor, SparkleActivity } from "../utils/types";
import reactionsApi from "../api/reactions";
import useUser from "./useUser";

const REACTION_KIND = "comment";

export default () => {
  const { user } = useUser();

  const handleComment = async (
    sparkle: Activity | SparkleActivity,
    comment: string
  ) => {
    const actorId = (sparkle.actor as unknown as ActivityActor).id;

    if (user)
      return await reactionsApi.add({
        actorId,
        data: { text: comment },
        kind: REACTION_KIND,
        sparkleId: sparkle.id,
      });
  };

  return { handleComment };
};
