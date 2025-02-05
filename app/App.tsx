import 'expo-splash-screen'; // Ensure this import is at the top
import './gesture-handler';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { StreamApp } from 'expo-activity-feed';
import { STREAM_API_KEY, STREAM_APP_ID } from '@env';
import { connect, DefaultGenerics, StreamClient } from 'getstream';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

import { ActivityActor, FollowersResult, SparkleActivity } from './utils/types';
import { AnonymousUserInfo, anonymousUserInfo } from './utils/app';
import { AppNavigator } from './navigation';
import { initUsers } from './hooks/useUsers';
import { LightTheme } from './navigation/navigationTheme';
import { OfflineNoticeBar } from './components';
import {
  ProfileUserContext,
  SparklesContext,
  StreamClientContext,
  ThreadSparkleContext,
  ThemeContext,
  UserContext,
} from './contexts';
import authService from './api/auth';
import authStorage from './auth/storage';
import UsersContext, { IdUserMap, User, UsernameIdMap } from './contexts/UsersContext';
import usersApi from './api/users';
import useTheme from './hooks/useTheme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [anonymousUser, setAnonymousUser] = useState<AnonymousUserInfo>();
  const [appIsReady, setAppIsReady] = useState(false);
  const [client, setClient] = useState<StreamClient<DefaultGenerics>>();
  const [fontsLoaded] = useFonts({ Quicksand_400Regular, Quicksand_700Bold });
  const [idUserMap, setIdUserMap] = useState<IdUserMap>({});
  const [profileSparkles, setProfileSparkles] = useState<SparkleActivity[]>([]);
  const [profileUser, setProfileUser] = useState<ActivityActor>();
  const [theme, setTheme] = useState<Theme>(LightTheme);
  const [user, setUser] = useState<User>();
  const [usernameIdMap, setUsernameIdMap] = useState<UsernameIdMap>({});
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [threadSparkle, setThreadSparkle] = useState<SparkleActivity>();
  const { colorScheme, retrieveSavedTheme } = useTheme();

  useEffect(() => {
    const fetchUserFollowing = async () => {
      try {
        if (!user || user?.followersId) return;

        const followersRes = await usersApi.getUserFollowers(user._id);
        const followingRes = await usersApi.getUserFollowing(user._id);
        if (!followersRes.ok || !followingRes.ok) return;

        const followingId: { [id: string]: string } = {};
        (followingRes.data as FollowersResult).forEach(({ target_id }) => {
          const id = target_id.replace('user:', '');
          followingId[id] = id;
        });

        const followersId: { [id: string]: string } = {};
        (followersRes.data as FollowersResult).forEach(({ feed_id }) => {
          const id = feed_id.replace('timeline:', '');
          followersId[id] = id;
        });
        setUser({ ...user, followersId, followingId });
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

        setAnonymousUser(authService.decode(anonymousUserInfo) as AnonymousUserInfo);
        setClient(connect(STREAM_API_KEY, null, STREAM_APP_ID));

        await initUsers({
          onLoad: setUsersLoading,
          setUsers,
          setUsernameIdMap,
          idUserMap,
          setIdUserMap,
        });

        setTheme(await retrieveSavedTheme());
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

  if (!appIsReady || !fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <StatusBar
        animated
        barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
        networkActivityIndicatorVisible
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer theme={theme}>
        <StreamApp
          apiKey={STREAM_API_KEY}
          appId={STREAM_APP_ID}
          token={user?.feedToken || anonymousUser.userToken}
        >
          <StreamClientContext.Provider value={client}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
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
                    <ProfileUserContext.Provider value={{ profileUser, setProfileUser }}>
                      <ThreadSparkleContext.Provider value={{ threadSparkle, setThreadSparkle }}>
                        <OfflineNoticeBar />
                        <AppNavigator />
                      </ThreadSparkleContext.Provider>
                    </ProfileUserContext.Provider>
                  </SparklesContext.Provider>
                </UserContext.Provider>
              </UsersContext.Provider>
            </ThemeContext.Provider>
          </StreamClientContext.Provider>
        </StreamApp>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
