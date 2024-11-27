// make sure gesture-handler import is at the top and there's nothing else before it
import "./gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./navigation";
import { initUsers } from "./hooks/useUsers";
import { navigationTheme } from "./navigation";
import { User, Users } from "./contexts/UsersContext";
import { UsersContext } from "./contexts";

export default function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<Users>({});
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    initUsers({ onLoad: setUsersLoading, setAllUsers, setUsers });
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
