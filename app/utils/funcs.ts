import { User } from "../contexts/UsersContext";

import { ActivityActor } from "./types";

export const getActorFromUser = ({
  _id,
  timestamp,
  ...rest
}: User): ActivityActor => {
  const time = timestamp
    ? new Date(timestamp).toISOString()
    : new Date().toISOString();

  return {
    data: { ...rest, id: _id },
    created_at: time,
    updated_at: time,
    id: _id,
  };
};

export function generateSparkleLink(
  actorUsername: string,
  sparkleActivityId: string
) {
  return `/${actorUsername}/status/${sparkleActivityId}`;
}
