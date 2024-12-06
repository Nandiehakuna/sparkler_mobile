import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { ActivityIndicator, UserCard, UserCardSeparator } from "../components";
import { EmptyFollowing } from "../components/following";
import { FollowersResult, FollowingResult } from "../utils/types";
import { useProfileUser, useUsers } from "../hooks";
import service from "../services/users";
import colors from "../config/colors";

export default () => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState<FollowingResult>([]);
  const { profileUser } = useProfileUser();
  const { idUserMap } = useUsers();

  useEffect(() => {
    const loadFollowing = async () => {
      if (!profileUser) return;

      setLoading(true);
      const res = await service.getUserFollowing(profileUser.id);
      setLoading(false);

      if (res.ok) setFollowing(res.data as FollowersResult);
    };

    loadFollowing();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <ScrollView style={styles.container}>
      {!following.length && <EmptyFollowing />}

      <FlatList
        data={following}
        keyExtractor={(user) => user.feed_id}
        ItemSeparatorComponent={UserCardSeparator}
        renderItem={({ item: user }) => (
          <UserCard user={idUserMap[user.feed_id.replace("timeline:", "")]} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
});
