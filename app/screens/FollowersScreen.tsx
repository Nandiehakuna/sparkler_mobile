import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { ActivityIndicator, UserCard, UserCardSeparator } from "../components";
import { FollowersResult } from "../utils/types";
import { useProfileUser, useUsers } from "../hooks";
import service from "../services/users";
import colors from "../config/colors";

export default () => {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<FollowersResult>([]);
  const { profileUser } = useProfileUser();
  const { idUserMap } = useUsers();

  useEffect(() => {
    const loadFollowers = async () => {
      if (!profileUser) return;

      setLoading(true);
      const res = await service.getUserFollowers(profileUser.id);
      setLoading(false);

      if (res.ok) setFollowers(res.data as FollowersResult);
    };

    loadFollowers();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={followers}
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
    backgroundColor: colors.white,
    flex: 1,
  },
});
