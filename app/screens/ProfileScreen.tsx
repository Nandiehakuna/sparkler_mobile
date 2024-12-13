import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { format } from "date-fns";
import { Activity } from "getstream";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  ActivityActor,
  FollowingsResponse,
  ScreenProps,
  SparkleActivity,
} from "../utils/types";
import {
  ActivityIndicator,
  FloatingButton,
  Sparkle,
  Text,
} from "../components";
import { FollowButton } from "../components/thread";
import { getActorFromUser } from "../utils/funcs";
import { routes } from "../navigation";
import {
  useProfileUser,
  useUser,
  useProfileSparkles,
  useNavigation,
} from "../hooks";
import colors from "../config/colors";
import service from "../api/users";
import TopTabBar from "../components/profile/TopTabBar";

export default ({ route }: ScreenProps) => {
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const { setProfileUser } = useProfileUser();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<ActivityActor>();
  const [loading, setLoading] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleActivity[]>([]);
  const [sparklesLoaded, setSparklesLoaded] = useState(false);
  const [showMediaSparkles, setShowMediaSparkles] = useState(false);
  const { setSparkles: setProfileSparkles } = useProfileSparkles();
  const navigation = useNavigation();

  const paramUser: ActivityActor | undefined = route.params as ActivityActor;

  useEffect(() => {
    const fetchSparkles = async () => {
      if (!paramUser?.id || sparklesLoaded) return;

      setSparklesLoaded(false);
      const { ok, data, problem } = await service.getUserSparkles(paramUser.id);
      setSparklesLoaded(true);

      if (ok) {
        setSparkles(data as SparkleActivity[]);
        setProfileSparkles(data as SparkleActivity[]);
      } else console.log("Error fetching sparkles: " + problem);
    };

    fetchSparkles();
  }, [paramUser?.id]);

  useEffect(() => {
    const isTheCurrentUser: boolean =
      typeof user?.id === "string" && user.id === paramUser?.id;

    const initProfileUser = () => {
      if (isTheCurrentUser) return;

      setLoading(true);
      const isCurrentUserProfile = !paramUser && currentUser;

      const userInfo = isCurrentUserProfile
        ? getActorFromUser(currentUser)
        : paramUser;

      setUser(userInfo);
      setProfileUser(userInfo);
      setLoading(false);
    };

    initProfileUser();
  }, [paramUser?.id, user?.id, loading]);

  useEffect(() => {
    const showFoll = async () => {
      if (!user) return;

      const { ok, data, problem } =
        await service.getUserFollowersAndFollowingCount(user.id);

      if (ok) {
        const {
          results: { followers, following },
        } = data as FollowingsResponse;
        setFollowers(followers.count);
        setFollowing(following.count);
      } else console.error("SOMETHING FAILED: ", problem);
    };

    showFoll();
  }, [user?.id]);

  if (!loading && !user) return <ActivityIndicator />;

  if (!user) return <Text>User information not available</Text>;

  if (!paramUser) {
    navigation.navigate(routes.AUTH);
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
  const joinedDate = format(new Date(user.created_at), "MMMM yyyy");

  const renderHeader = () => (
    <View>
      <Image
        source={{ uri: coverImage || "https://picsum.photos/200/300" }}
        style={styles.coverImage}
        resizeMode="cover"
      />
      <View style={styles.profileSection}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <View style={styles.buttonsContainer}>
          <FollowButton userId={user.id} />
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          {verified && (
            <Image
              source={require("../assets/verified.png")}
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
              {customLink.replace("https://", "")}
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
          <Text style={styles.followStatsText}>{followers} Followers</Text>
        </TouchableOpacity>
        <Text style={styles.statsSeparator}>~</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.FOLLOWING)}>
          <Text style={styles.followStatsText}>{following} Following</Text>
        </TouchableOpacity>
      </View>

      <TopTabBar setShowMediaSparkles={setShowMediaSparkles} />

      <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />
    </View>
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  bio: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 6,
  },
  buttonsContainer: {
    marginTop: 45,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  coverImage: {
    width: "100%",
    height: 120,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    marginTop: -40, // Pull profile section upwards
    paddingHorizontal: 16,
    justifyContent: "space-between",
    width: "100%",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.white,
    marginRight: 16,
  },
  userInfo: {
    paddingHorizontal: 16,
    marginTop: 7,
  },
  name: {
    color: colors.dark,
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 5,
  },
  joinedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  joinedText: {
    fontSize: 14,
    color: colors.medium,
    marginLeft: 6,
  },
  followStatsContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 16,
  },
  followStatsText: {
    color: colors.medium,
    fontSize: 14,
    fontWeight: "bold",
  },
  sparklesCount: {
    color: colors.primary,
  },
  statsSeparator: {
    color: colors.medium,
    fontWeight: "600",
    marginHorizontal: 7,
  },
});
