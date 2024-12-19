import { createContext } from 'react';
//TODO: Check to see if we're still using user.followers & user.following
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
  coverImage: string;
  username: string;
  verified?: boolean;
  invalid?: boolean;
  youtube?: string;
  tiktok?: string;
  instagram?: string;
  customLink?: string;
  timestamp: number;
  followersId?: { [id: string]: string };
};

export const emptyUser: User = {
  _id: '',
  chatToken: '',
  email: '',
  feedToken: '',
  followers: {},
  following: {},
  name: '',
  profileImage: '',
  coverImage: '',
  username: '',
  timestamp: 0,
};

export type UsernameIdMap = { [username: string]: string };

export type IdUserMap = { [id: string]: User };

interface Value {
  idUserMap: IdUserMap;
  isLoading: boolean;
  setIdUserMap: (map: IdUserMap) => void;
  setLoading: (isLoading: boolean) => void;
  setUsernameIdMap: (users: UsernameIdMap) => void;
  setUsers: (users: User[]) => void;
  usernameIdMap: UsernameIdMap;
  users: User[];
}

export const UsersContext = createContext<Value>({
  idUserMap: {},
  isLoading: false,
  setIdUserMap: () => {},
  setLoading: () => {},
  setUsers: () => {},
  setUsernameIdMap: () => {},
  usernameIdMap: {},
  users: [],
});

UsersContext.displayName = 'Users Context';

export default UsersContext;
