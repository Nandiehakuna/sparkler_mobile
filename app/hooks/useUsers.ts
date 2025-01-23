import { useContext } from 'react';

import { IdUserMap, User, UsernameIdMap } from '../contexts/UsersContext';
import { Response } from '../api/client';
import { UsersContext } from '../contexts';
import service from '../api/users';

export function getVerifiedFirst(users: User[]): User[] {
  return users.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
}

export function getValidUsers(users: User[]): User[] {
  return users.filter(({ username }) => username !== 'awuori').filter((u) => !u.invalid);
}

interface InitUsersProps {
  idUserMap: IdUserMap;
  onLoad: (loading: boolean) => void;
  setUsernameIdMap: (usernameIdMap: UsernameIdMap) => void;
  setIdUserMap: (idUserMap: IdUserMap) => void;
  setUsers: (users: User[]) => void;
}

export async function initUsers({
  onLoad,
  setUsers,
  setUsernameIdMap,
  setIdUserMap,
}: InitUsersProps) {
  const mapUsersInfo = (users: User[]) => {
    let usernameIdMap: UsernameIdMap = {};
    let idUserMap: IdUserMap = {};

    users.forEach((user) => {
      usernameIdMap[user.username] = user._id;
      idUserMap[user._id] = user;
    });

    setIdUserMap(idUserMap);
    setUsernameIdMap(usernameIdMap);
  };

  const getAllUsers = async (): Promise<Response> => {
    onLoad(true);
    const res = await service.getAllUsers();
    onLoad(false);

    return res;
  };

  const initUsersInfo = async () => {
    const res = await getAllUsers();

    if (res.ok) {
      const users = res.data as User[];
      setUsers(getVerifiedFirst(getValidUsers(users)));
      mapUsersInfo(users);
    }
  };

  initUsersInfo();
}

const useUsers = () => {
  const context = useContext(UsersContext);

  const getUserIds = (usernames: string[]): string[] => {
    const userIds: string[] = [];

    usernames.forEach((username) => {
      const userId = context.usernameIdMap[username];
      if (userId) userIds.push(userId);
    });

    return userIds;
  };

  return { ...context, getUserIds };
};

export default useUsers;
