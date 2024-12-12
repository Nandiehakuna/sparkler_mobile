// make sure gesture-handler import is at the top and there's nothing else before it
import "./gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StreamApp } from "expo-activity-feed";
import { STREAM_API_KEY, STREAM_APP_ID } from "@env";
import { connect, DefaultGenerics, StreamClient } from "getstream";
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import { ActivityActor, SparkleActivity } from "./utils/types";
import { ActivityIndicator } from "./components";
import { AnonymousUserInfo, anonymousUserInfo } from "./utils/app";
import { AppNavigator } from "./navigation";
import { initUsers } from "./hooks/useUsers";
import { navigationTheme } from "./navigation";
import {
  ProfileUserContext,
  SparklesContext,
  StreamClientContext,
  UserContext,
} from "./contexts";
import authService from "./services/auth";
import authStorage from "./auth/storage";
import UsersContext, {
  IdUserMap,
  User,
  UsernameIdMap,
} from "./contexts/UsersContext";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [idUserMap, setIdUserMap] = useState<IdUserMap>({});
  const [profileSparkles, setProfileSparkles] = useState<SparkleActivity[]>([]);
  const [anonymousUser, setAnonymousUser] = useState<AnonymousUserInfo>();
  const [client, setClient] = useState<StreamClient<DefaultGenerics>>();
  const [profileUser, setProfileUser] = useState<ActivityActor>();
  const [user, setUser] = useState<User>();
  const [usernameIdMap, setUsernameIdMap] = useState<UsernameIdMap>({});
  const [usersLoading, setUsersLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  });

  useEffect(() => {
    const restoreUser = async () => {
      const user = await authStorage.getUser();
      if (user) setUser(user);
    };

    restoreUser();
    setAnonymousUser(
      authService.decode(anonymousUserInfo) as AnonymousUserInfo
    );
    setClient(connect(STREAM_API_KEY, null, STREAM_APP_ID));
    initUsers({
      onLoad: setUsersLoading,
      setUsers,
      setUsernameIdMap,
      idUserMap,
      setIdUserMap,
    });
  }, []);

  if (!anonymousUser || !fontsLoaded) return <ActivityIndicator />;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StreamApp
        apiKey={STREAM_API_KEY}
        appId={STREAM_APP_ID}
        token={user?.feedToken || anonymousUser.userToken}
      >
        <StreamClientContext.Provider value={client}>
          <UsersContext.Provider
            value={{
              users,
              setUsers,
              usernameIdMap,
              isLoading: usersLoading,
              setLoading: setUsersLoading,
              idUserMap,
              setIdUserMap,
              setUsernameIdMap,
            }}
          >
            <UserContext.Provider value={{ setUser, user }}>
              <SparklesContext.Provider
                value={{
                  setSparkles: setProfileSparkles,
                  sparkles: profileSparkles,
                }}
              >
                <ProfileUserContext.Provider
                  value={{ profileUser, setProfileUser }}
                >
                  <AppNavigator />
                </ProfileUserContext.Provider>
              </SparklesContext.Provider>
            </UserContext.Provider>
          </UsersContext.Provider>
        </StreamClientContext.Provider>
      </StreamApp>
    </NavigationContainer>
  );
}
