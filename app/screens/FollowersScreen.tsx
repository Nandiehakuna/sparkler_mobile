import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ActivityIndicator, UserCard, UserCardSeparator } from '../components';
import { EmptyFollowing } from '../components/following';
import { FollowersResult } from '../utils/types';
import { useProfileUser, useTheme, useUsers } from '../hooks';
import service from '../api/users';

export default () => {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<FollowersResult>([]);
  const { idUserMap } = useUsers();
  const { profileUser } = useProfileUser();
  const { theme } = useTheme();

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator visible={loading} />
      <FlatList
        data={followers}
        keyExtractor={(user) => user.feed_id}
        ListEmptyComponent={<EmptyFollowing label="followers" />}
        ItemSeparatorComponent={UserCardSeparator}
        renderItem={({ item: user }) => (
          <UserCard user={idUserMap[user.feed_id.replace('timeline:', '')]} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
});
