// make sure gesture-handler import is at the top and there's nothing else before it
import "./gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./navigation";
import { navigationTheme } from "./navigation";
import { User, Users } from "./contexts/UsersContext";
import { UsersContext } from "./contexts";
import usersService from "./services/users";

export default function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<Users>({});
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const retrieveAllUsersInfo = async () => {
      try {
        setUsersLoading(true);
        const res = await usersService.getAllUsers();
        setUsersLoading(false);

        if (res.ok) {
          setAllUsers(res.data as User[]);

          let users: Users = {};
          (res.data as User[]).forEach(({ _id, username }) => {
            if (!users[username]) users[username] = _id;
          });
          setUsers(users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    retrieveAllUsersInfo();
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <UsersContext.Provider
        value={{
          allUsers,
          setUsers,
          users,
          isLoading: usersLoading,
          setLoading: setUsersLoading,
        }}
      >
        <AppNavigator />
      </UsersContext.Provider>
    </NavigationContainer>
  );
}
