import { createContext } from "react";

import { User } from "./UsersContext";

export interface UserContextValue {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});

UserContext.displayName = "User Context";

export default UserContext;
