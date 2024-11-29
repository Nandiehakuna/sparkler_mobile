// make sure gesture-handler import is at the top and there's nothing else before it
import "./gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StreamApp } from "expo-activity-feed";
import { STREAM_API_KEY, STREAM_APP_ID } from "@env";
import * as stream from "getstream";
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import { ActivityActor } from "./utils/types";
import { AppData, appDataJwt } from "./utils/app";
import { AppNavigator } from "./navigation";
import { initUsers } from "./hooks/useUsers";
import { navigationTheme } from "./navigation";
import { SplashScreen } from "./screens";
import { ProfileUserContext, StreamClientContext } from "./contexts";
import auth from "./services/auth";
import UsersContext, { User, Users } from "./contexts/UsersContext";

export default function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [profileUser, setProfileUser] = useState<ActivityActor>();
  const [users, setUsers] = useState<Users>({});
  const [usersLoading, setUsersLoading] = useState(false);
  const [appData, setAppData] = useState<AppData>();
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  });
  const [client, setClient] =
    useState<
      stream.StreamClient<
        stream.UR,
        stream.UR,
        stream.UR,
        stream.UR,
        stream.UR,
        stream.UR
      >
    >();

  useEffect(() => {
    setAppData(auth.decode(appDataJwt) as AppData);

    setClient(stream.connect(STREAM_API_KEY, null, STREAM_APP_ID));

    initUsers({ onLoad: setUsersLoading, setAllUsers, setUsers });
  }, []);

  if (!appData || !fontsLoaded) return <SplashScreen />;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StreamApp
        apiKey={STREAM_API_KEY}
        appId={STREAM_APP_ID}
        token={appData.userToken}
      >
        <StreamClientContext.Provider value={client}>
          <UsersContext.Provider
            value={{
              allUsers,
              setUsers,
              users,
              isLoading: usersLoading,
              setLoading: setUsersLoading,
            }}
          >
            <ProfileUserContext.Provider
              value={{ profileUser, setProfileUser }}
            >
              <AppNavigator />
            </ProfileUserContext.Provider>
          </UsersContext.Provider>
        </StreamClientContext.Provider>
      </StreamApp>
    </NavigationContainer>
  );
}
