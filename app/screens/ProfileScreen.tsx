import { useEffect, useState } from 'react';
import {
  Animated,
  Image as AppImage,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  SafeAreaView,
  Image,
} from 'react-native';
import { Activity } from 'getstream';
import { format, parseISO } from 'date-fns';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ActivityActor, FollowingsResponse, ScreenProps, SparkleActivity } from '../utils/types';
import { ActivityIndicator, Avatar, Sparkle, Text } from '../components';
import { appUrl } from '../api/client';
import { UserButton } from '../components/thread';
import { getActorFromUser } from '../utils/funcs';
import { routes } from '../navigation';
import { ShareSparkleOptions } from '../components/sparkle';
import {
  useProfileUser,
  useUser,
  useProfileSparkles,
  useNavigation,
  useTheme,
  useToast,
} from '../hooks';
import colors from '../config/colors';
import ProfileTopTabBar from '../components/profile/TopTabBar';
import service from '../api/users';
import SparkleText from '../components/sparkle/SparkleText';
import UserCardIcons from '../components/UserCardIcons';

export type ProfileScreen = 'sparkles' | 'media' | 'projects';

export default ({ route }: ScreenProps) => {
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [bioCharLimit, setBioCharLimit] = useState(140);
  const [currentScreen, setCurrentScreen] = useState<ProfileScreen>('sparkles');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { setProfileUser } = useProfileUser();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<ActivityActor | undefined>(
    route.params || getActorFromUser(currentUser)
  );
  const [loading, setLoading] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleActivity[]>([]);
  const [scrollY] = useState(new Animated.Value(0));
  const [sparklesLoaded, setSparklesLoaded] = useState(false);
  const { setSparkles: setProfileSparkles } = useProfileSparkles();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const paramUser: ActivityActor | undefined = route.params as ActivityActor;
  const isTheCurrentUser: boolean = typeof user?.id === 'string' && user.id === paramUser?.id;
  const opacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const scale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const fetchSparkles = async () => {
      if (sparklesLoaded) return;

      if (!paramUser?.id) setUser(getActorFromUser(currentUser));

      setSparklesLoaded(false);
      const { ok, data, problem } = await service.getUserSparkles(user?.id);
      setSparklesLoaded(true);

      if (ok) {
        setSparkles(data as SparkleActivity[]);
        setProfileSparkles(data as SparkleActivity[]);
      } else console.log('Error fetching sparkles: ' + problem);
    };

    fetchSparkles();
  }, [paramUser?.id]);

  useEffect(() => {
    const initProfileUser = () => {
      setLoading(true);
      setProfileUser(paramUser);
      if (!user) setUser(isTheCurrentUser ? getActorFromUser(currentUser) : paramUser);
      setLoading(false);
    };

    initProfileUser();
  }, [user?.id]);

  useEffect(() => {
    const showFollings = async () => {
      if (!user) return;

      const { ok, data, problem } = await service.getUserFollowersAndFollowingCount(user.id);

      if (ok) {
        const {
          results: { followers, following },
        } = data as FollowingsResponse;
        setFollowers(followers.count);
        setFollowing(following.count);
      } else console.error('SOMETHING FAILED: ', problem);
    };

    showFollings();
  }, [user?.id]);

  if (!user) {
    toast.show('Sparkler could not know who you are trying to see', 'error');
    navigation.goBack();
    return null;
  }

  const { coverImage, profileImage, name, username, bio, verified, customLink, isAdmin } =
    user.data;
  const joinedDate = format(parseISO(user.created_at), 'MMMM yyyy');

  const viewCoverPhoto = () => {
    if (coverImage) navigation.navigate(routes.VIEW_IMAGE, { images: [coverImage] });
  };

  const viewProfilePhoto = () => {
    if (profileImage) navigation.navigate(routes.VIEW_IMAGE, { images: [profileImage] });
  };

  const getCoverImage = (): ImageSourcePropType =>
    coverImage ? { uri: coverImage } : require('../assets/cover-image.jpg');

  const BackIcon = (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.safeArea}>{BackIcon}</SafeAreaView>
      <TouchableOpacity onPress={viewCoverPhoto}>
        <AppImage source={getCoverImage()} style={styles.coverImage} />
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Avatar
            onPress={viewProfilePhoto}
            image={profileImage}
            style={{ ...styles.profileImage, borderWidth: profileImage ? 2 : 0 }}
          />
        </Animated.View>

        <View style={styles.buttonsContainer}>
          <UserButton
            userId={user.id}
            showOtherButtons
            onShareProfile={() => setShowShareOptions(true)}
          />
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} isBold>
            {name}
          </Text>
          {verified && (
            <AppImage
              source={isAdmin ? require('../assets/admin.png') : require('../assets/verified.png')}
              style={styles.verifiedIcon}
            />
          )}
        </View>
        <Text style={styles.username}>@{username}</Text>

        {Boolean(bio?.length) && (
          <View style={styles.bio}>
            <SparkleText
              text={bio}
              textLimit={bioCharLimit}
              onReadMore={() => setBioCharLimit(1_000)}
            />
          </View>
        )}

        {Boolean(customLink?.length) && (
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => Linking.openURL(customLink)}
          >
            <FontAwesome name="link" size={14} color={colors.primary} />
            <Text style={styles.linkText}>{customLink.replace('https://', '')}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.joinedContainer}>
          <FontAwesome name="calendar" size={14} color={theme.colors.text} />
          <Text style={styles.joinedText}>Joined {joinedDate}</Text>
        </View>
      </View>
      <View style={styles.followStatsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.FOLLOWERS)}>
          <Text style={styles.followStatsText} isBold>
            {followers} Follower{followers === 1 ? '' : 's'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.statsSeparator}>·</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.FOLLOWING)}>
          <Text style={styles.followStatsText} isBold>
            {following} Following
          </Text>
        </TouchableOpacity>
      </View>
      <ProfileTopTabBar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </View>
  );

  const renderDynamicHeader = () => (
    <Animated.View style={[styles.dynamicHeader, { opacity }]}>
      <View style={styles.headerContent}>
        {BackIcon}

        <View style={{ marginLeft: 8 }}>
          <View style={styles.nameContainer}>
            <Text isBold style={styles.headerName}>
              {name}
            </Text>
            {verified && (
              <Image
                source={
                  isAdmin ? require('../assets/admin.png') : require('../assets/verified.png')
                }
                style={styles.verifiedIcon}
              />
            )}
          </View>
          <Text style={styles.headerSparklesCount}>{sparkles.length} Sparkles</Text>
        </View>
      </View>
      <UserButton userId={user?.id} />
    </Animated.View>
  );

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  if (!user) return <ActivityIndicator visible />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AnimatedFlatList
        data={sparkles}
        keyExtractor={(item) => (item as { id: string }).id}
        ListHeaderComponent={renderHeader}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Sparkle activity={item as Activity} currentProfileScreen={currentScreen} />
        )}
      />
      {renderDynamicHeader()}
      <ShareSparkleOptions
        onClose={() => setShowShareOptions(false)}
        isOpen={showShareOptions}
        sparkleUrl={`${appUrl}${username}`}
        text={'Follow me on Sparkler'}
        title="Profile"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 0,
    zIndex: 10,
    padding: 15,
  },
  dynamicHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.medium,
    zIndex: 9,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackButton: {
    marginRight: 10,
  },
  headerUserInfo: {
    flex: 1,
  },
  headerName: {
    color: colors.white,
    fontSize: 18,
  },
  headerSparklesCount: {
    color: colors.white,
    fontSize: 14,
  },
  bio: {
    marginTop: 6,
  },
  buttonsContainer: {
    marginTop: 50,
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
  },
  coverImage: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
  },
  profileSection: {
    flexDirection: 'row',
    marginTop: -40,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  profileImage: {
    borderColor: colors.white,
    borderRadius: 40,
    height: 80,
    width: 80,
    borderWidth: 2,
  },
  userInfo: {
    paddingHorizontal: 16,
    marginTop: 7,
  },
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    marginRight: 4,
    marginTop: 3,
  },
  username: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 2,
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
    marginTop: 2,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  joinedText: {
    fontSize: 14,
    marginLeft: 6,
    color: colors.medium,
  },
  followStatsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 16,
  },
  followStatsText: {
    fontSize: 14,
  },
  statsSeparator: {
    fontSize: 18,
    marginHorizontal: 8,
  },
});
