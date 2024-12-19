import 'expo-splash-screen'; // Ensure this import is at the top
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StreamApp } from 'expo-activity-feed';
import { STREAM_API_KEY, STREAM_APP_ID } from '@env';
import { connect, DefaultGenerics, StreamClient } from 'getstream';
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';
import * as SplashScreen from 'expo-splash-screen';

import { ActivityActor, FollowersResult, SparkleActivity } from './utils/types';
import { AnonymousUserInfo, anonymousUserInfo } from './utils/app';
import { AppNavigator } from './navigation';
import { initUsers } from './hooks/useUsers';
import { navigationTheme } from './navigation';
import {
  ProfileUserContext,
  SparklesContext,
  StreamClientContext,
  UserContext,
} from './contexts';
import authService from './api/auth';
import authStorage from './auth/storage';
import UsersContext, {
  IdUserMap,
  User,
  UsernameIdMap,
} from './contexts/UsersContext';
import usersApi from './api/users';

SplashScreen.preventAutoHideAsync();

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
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  });

  useEffect(() => {
    const fetchUserFollowing = async () => {
      try {
        if (!user || user?.followersId) return;

        const res = await usersApi.getUserFollowers(user._id);
        if (!res.ok) return;

        const followersId: { [id: string]: string } = {};
        (res.data as FollowersResult).forEach(({ feed_id }) => {
          const id = feed_id.replace('timeline:', '');
          followersId[id] = id;
        });
        setUser({ ...user, followersId });
      } catch (error) {
        console.log(`Error fetching user's following: ${error}`);
      }
    };

    fetchUserFollowing();
  }, [user]);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const storedUser = await authStorage.getUser();
        if (storedUser) setUser(storedUser);

        setAnonymousUser(
          authService.decode(anonymousUserInfo) as AnonymousUserInfo,
        );
        setClient(connect(STREAM_API_KEY, null, STREAM_APP_ID));

        await initUsers({
          onLoad: setUsersLoading,
          setUsers,
          setUsernameIdMap,
          idUserMap,
          setIdUserMap,
        });
      } catch (error) {
        console.error('Error preparing app:', error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) SplashScreen.hideAsync();
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null; // The splash screen will remain visible
  }

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
