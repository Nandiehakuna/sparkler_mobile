import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ActivityIndicator, UserCard, UserCardSeparator } from '../components';
import { EmptyFollowing } from '../components/following';
import { FollowersResult, FollowingResult } from '../utils/types';
import { useProfileUser, useUsers } from '../hooks';
import service from '../api/users';
import colors from '../config/colors';

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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
});
