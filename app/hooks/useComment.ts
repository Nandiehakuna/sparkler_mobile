import { Activity } from "getstream";

import { ActivityActor, SparkleActivity } from "../utils/types";
import useStreamClient from "./useStreamClient";
import useUser from "./useUser";

const REACTION_KIND = "comment";

export default () => {
  const { user } = useUser();
  const client = useStreamClient();

  function getTargetFeeds(actorId: string): string[] {
    const feeds: string[] = [];

    if (user?._id !== actorId) feeds.push(`notification:${actorId}`);

    return feeds;
  }

  const handleComment = async (
    sparkle: Activity | SparkleActivity,
    comment: string
  ) => {
    if (user)
      return await client?.reactions.add(
        REACTION_KIND,
        sparkle,
        { text: comment },
        {
          targetFeeds: getTargetFeeds(
            (sparkle.actor as unknown as ActivityActor).id
          ),
        }
      );
  };

  return { handleComment };
};
