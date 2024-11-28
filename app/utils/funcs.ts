import { User } from "../contexts/UsersContext";

import { ActivityActor } from "./types";

export const getActorFromUser = ({
  _id,
  timestamp,
  ...rest
}: User): ActivityActor => {
  const time = new Date(timestamp).toISOString();

  return {
    data: { ...rest, id: _id },
    created_at: time,
    updated_at: time,
    id: _id,
  };
};
