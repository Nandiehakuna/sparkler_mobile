import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ActivityIndicator, UserCard, UserCardSeparator } from '../components';
import { EmptyFollowing } from '../components/following';
import { FollowersResult, FollowingResult } from '../utils/types';
import { useProfileUser, useTheme, useUsers } from '../hooks';
import service from '../api/users';
import colors from '../config/colors';

export default () => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState<FollowingResult>([]);
  const { idUserMap } = useUsers();
  const { profileUser } = useProfileUser();
  const { theme } = useTheme();

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

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <FlatList
        data={following}
        style={styles.container}
        keyExtractor={(user) => user.feed_id}
        ItemSeparatorComponent={UserCardSeparator}
        ListEmptyComponent={<EmptyFollowing />}
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
  },
});
