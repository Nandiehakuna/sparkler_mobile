import { useEffect, useState } from 'react';
import {
  Image as AppImage,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import { format } from 'date-fns';
import { Activity } from 'getstream';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
  const [sparklesLoaded, setSparklesLoaded] = useState(false);
  const { setSparkles: setProfileSparkles } = useProfileSparkles();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const paramUser: ActivityActor | undefined = route.params as ActivityActor;
  const isTheCurrentUser: boolean = typeof user?.id === 'string' && user.id === paramUser?.id;

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
    toast.show('Sparkler could know who you are trying to see', 'error');
    navigation.goBack();
    return null;
  }

  const { coverImage, profileImage, name, username, bio, verified, customLink, isAdmin } =
    user.data;
  const joinedDate = format(new Date(user.created_at), 'MMMM yyyy');

  const viewCoverPhoto = () => {
    if (coverImage) navigation.navigate(routes.VIEW_IMAGE, { images: [coverImage] });
  };

  const viewProfilePhoto = () => {
    if (profileImage) navigation.navigate(routes.VIEW_IMAGE, { images: [profileImage] });
  };

  const getCoverImage = (): ImageSourcePropType =>
    coverImage ? { uri: coverImage } : require('../assets/cover-image.jpg');

  const renderHeader = () => (
    <View>
      <ActivityIndicator visible={loading} />
      <TouchableOpacity onPress={viewCoverPhoto}>
        <AppImage source={getCoverImage()} style={styles.coverImage} />
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Avatar
          onPress={viewProfilePhoto}
          image={profileImage}
          style={{ ...styles.profileImage, borderWidth: profileImage ? 2 : 0 }}
        />

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
              source={
                isAdmin
                  ? require('../assets/admin-verification.png')
                  : require('../assets/verified.png')
              }
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
        <Text style={styles.statsSeparator}>~</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.FOLLOWING)}>
          <Text style={styles.followStatsText} isBold>
            {following} Following
          </Text>
        </TouchableOpacity>
      </View>

      <ProfileTopTabBar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </View>
  );

  if (!user) return <ActivityIndicator visible />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={sparkles}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Sparkle activity={item as unknown as Activity} currentProfileScreen={currentScreen} />
        )}
      />

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
  bio: {
    marginTop: 6,
  },
  buttonsContainer: {
    marginTop: 50,
  },
  container: {
    flex: 1,
  },
  coverImage: {
    height: 120,
    objectFit: 'cover',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    marginTop: -40,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  profileImage: {
    borderColor: colors.white,
    borderRadius: 40,
    height: 80,
    marginRight: 16,
    objectFit: 'cover',
    width: 80,
  },
  userInfo: {
    paddingHorizontal: 16,
    marginTop: 7,
  },
  name: {
    fontSize: 18,
    marginRight: 5,
    marginTop: 3,
  },
  username: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 2,
  },
  verifiedIcon: {
    width: 14,
    height: 14,
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
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  joinedText: {
    fontSize: 14,
    marginLeft: 6,
  },
  followStatsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 16,
  },
  followStatsText: {
    fontSize: 14,
  },
  sparklesCount: {
    color: colors.primary,
  },
  statsSeparator: {
    color: colors.medium,
    fontWeight: '600',
    marginHorizontal: 7,
  },
});
