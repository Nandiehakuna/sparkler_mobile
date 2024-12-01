import { createContext } from "react";
import { UserAPIResponse } from "getstream";

import { ActivityActor } from "../utils/types";

type DefaultUT = {
  id: string;
  name: string;
  avatar: string;
};

export interface FeedUser extends UserAPIResponse {}

export interface Value {
  profileUser: ActivityActor | undefined;
  setProfileUser: (user: ActivityActor) => void;
}

export const ProfileUserContext = createContext<Value>({
  profileUser: undefined,
  setProfileUser: () => {},
});

ProfileUserContext.displayName = "Profile User Context";

export default ProfileUserContext;
