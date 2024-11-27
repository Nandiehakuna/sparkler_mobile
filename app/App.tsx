// make sure gesture-handler import is at the top and there's nothing else before it
import "./gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StreamApp } from "expo-activity-feed";

import { AppData, appDataJwt } from "./utils/app";
import { AppNavigator } from "./navigation";
import { initUsers } from "./hooks/useUsers";
import { navigationTheme } from "./navigation";
import { SplashScreen } from "./screens";
import { User, Users } from "./contexts/UsersContext";
import { UsersContext } from "./contexts";
import auth from "./services/auth";

export default function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<Users>({});
  const [usersLoading, setUsersLoading] = useState(false);
  const [appData, setAppData] = useState<AppData>();

  useEffect(() => {
    setAppData(auth.decode(appDataJwt) as AppData);
    initUsers({ onLoad: setUsersLoading, setAllUsers, setUsers });
  }, []);

  if (!appData) return <SplashScreen />;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StreamApp
        apiKey={appData.key}
        appId={appData.id}
        token={appData.userToken}
      >
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
      </StreamApp>
    </NavigationContainer>
  );
}
