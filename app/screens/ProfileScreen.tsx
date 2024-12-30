import { useEffect, useState } from 'react';
import {
  Image as AppImage,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { format } from 'date-fns';
import { Activity } from 'getstream';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  ActivityActor,
  FollowingsResponse,
  ScreenProps,
  SparkleActivity,
} from '../utils/types';
import {
  ActivityIndicator,
  Avatar,
  Image,
  Screen,
  Sparkle,
  Text,
} from '../components';
import { UserButton } from '../components/thread';
import { getActorFromUser } from '../utils/funcs';
import { routes } from '../navigation';
import {
  useProfileUser,
  useUser,
  useProfileSparkles,
  useNavigation,
} from '../hooks';
import colors from '../config/colors';
import service from '../api/users';
import TopTabBar from '../components/profile/TopTabBar';

export default ({ route }: ScreenProps) => {
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const { setProfileUser } = useProfileUser();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<ActivityActor | undefined>(route.params);
  const [loading, setLoading] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleActivity[]>([]);
  const [sparklesLoaded, setSparklesLoaded] = useState(false);
  const [showMediaSparkles, setShowMediaSparkles] = useState(false);
  const { setSparkles: setProfileSparkles } = useProfileSparkles();
  const navigation = useNavigation();

  const paramUser: ActivityActor | undefined = route.params as ActivityActor;
  const isTheCurrentUser: boolean =
    typeof user?.id === 'string' && user.id === paramUser?.id;

  useEffect(() => {
    const fetchSparkles = async () => {
      if (!paramUser?.id || sparklesLoaded) return;

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
      if (!user)
        setUser(isTheCurrentUser ? getActorFromUser(currentUser) : paramUser);
      setLoading(false);
    };

    initProfileUser();
  }, [user?.id]);

  useEffect(() => {
    const showFollings = async () => {
      if (!user) return;

      const { ok, data, problem } =
        await service.getUserFollowersAndFollowingCount(user.id);

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

  if (loading) return <ActivityIndicator />;

  if (!user) {
    //TODO: toast to show that the profile state isn't right
    navigation.goBack();
    return null;
  }

  const {
    coverImage,
    profileImage,
    name,
    username,
    bio,
    verified,
    customLink,
  } = user.data;
  const joinedDate = format(new Date(user.created_at), 'MMMM yyyy');

  const viewCoverPhoto = () => {
    if (coverImage)
      navigation.navigate(routes.VIEW_IMAGE, { images: [coverImage] });
  };

  const viewProfilePhoto = () => {
    if (profileImage)
      navigation.navigate(routes.VIEW_IMAGE, { images: [profileImage] });
  };

  const renderHeader = () => (
    <View>
      <TouchableOpacity onPress={viewCoverPhoto}>
        <Image
          uri={coverImage || 'https://picsum.photos/200/300'}
          style={styles.coverImage}
        />
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Avatar
          onPress={viewProfilePhoto}
          image={profileImage}
          style={{ ...styles.profileImage, borderWidth: profileImage ? 2 : 0 }}
        />

        <View style={styles.buttonsContainer}>
          <UserButton userId={user.id} />
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          {verified && (
            <AppImage
              source={require('../assets/verified.png')}
              style={styles.verifiedIcon}
            />
          )}
        </View>
        <Text style={styles.username}>@{username}</Text>

        {Boolean(bio?.length) && <Text style={styles.bio}>{bio}</Text>}

        {Boolean(customLink?.length) && (
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => Linking.openURL(customLink)}
          >
            <FontAwesome name="link" size={14} color={colors.primary} />
            <Text style={styles.linkText}>
              {customLink.replace('https://', '')}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.joinedContainer}>
          <FontAwesome name="calendar" size={14} color={colors.medium} />
          <Text style={styles.joinedText}>Joined {joinedDate}</Text>
        </View>
      </View>

      <View style={styles.followStatsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.FOLLOWERS)}>
          <Text style={styles.followStatsText}>
            {followers} Follower{followers === 1 ? '' : 's'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.statsSeparator}>~</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.FOLLOWING)}>
          <Text style={styles.followStatsText}>{following} Following</Text>
        </TouchableOpacity>
      </View>

      <TopTabBar
        setShowMediaSparkles={setShowMediaSparkles}
        showingMedia={showMediaSparkles}
      />
    </View>
  );

  return (
    <Screen style={styles.container}>
      <FlatList
        data={sparkles}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Sparkle
            activity={item as unknown as Activity}
            onlyShowMedia={showMediaSparkles}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  bio: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 6,
  },
  buttonsContainer: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    marginTop: 3,
  },
  username: {
    fontSize: 14,
    color: colors.primary,
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
    color: colors.medium,
    marginLeft: 6,
  },
  followStatsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 16,
  },
  followStatsText: {
    color: colors.medium,
    fontSize: 14,
    fontWeight: 'bold',
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
