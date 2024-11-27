import { useContext } from "react";

import { User, Users } from "../contexts/UsersContext";
import { UsersContext } from "../contexts";
import service from "../services/users";

function getVerifiedFirst(users: User[]): User[] {
  return users.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
}

function getValidUsers(users: User[]): User[] {
  return users
    .filter(({ username }) => username !== "awuori")
    .filter((u) => !u.invalid);
}

export async function initUsers({
  onLoad,
  setAllUsers,
  setUsers,
}: {
  onLoad: (loading: boolean) => void;
  setUsers: (users: Users) => void;
  setAllUsers: (users: User[]) => void;
}) {
  try {
    onLoad(true);
    const res = await service.getAllUsers();
    onLoad(false);

    if (res.ok) {
      setAllUsers(getVerifiedFirst(getValidUsers(res.data as User[])));

      let users: Users = {};
      (res.data as User[]).forEach(({ _id, username }) => {
        if (!users[username]) users[username] = _id;
      });
      setUsers(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

const useUsers = () => {
  const context = useContext(UsersContext);

  const getUserIds = (usernames: string[]): string[] => {
    const userIds: string[] = [];

    usernames.forEach((username) => {
      const userId = context.users[username];
      if (userId) userIds.push(userId);
    });

    return userIds;
  };

  return { ...context, getUserIds };
};

export default useUsers;
