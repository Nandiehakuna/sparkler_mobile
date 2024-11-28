import { createContext } from "react";

export type User = {
  _id: string;
  bio?: string;
  chatToken: string;
  email: string;
  feedToken: string;
  followers: { [userId: string]: string };
  following: { [userId: string]: string };
  name: string;
  profileImage: string;
  username: string;
  verified?: boolean;
  invalid?: boolean;
  youtube?: string;
  tiktok?: string;
  instagram?: string;
  customLink?: string;
  timestamp: number;
};

export type Users = { [username: string]: string };

interface Value {
  allUsers: User[];
  users: Users;
  setUsers: (users: Users) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const UsersContext = createContext<Value>({
  allUsers: [],
  users: {},
  setUsers: () => {},
  isLoading: false,
  setLoading: () => {},
});

UsersContext.displayName = "Users Context";

export default UsersContext;
