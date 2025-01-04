import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ActivityIndicator, UserCard, UserCardSeparator } from '../components';
import { EmptyFollowing } from '../components/following';
import { FollowersResult } from '../utils/types';
import { useProfileUser, useUsers } from '../hooks';
import colors from '../config/colors';
import service from '../api/users';

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

  return (
    <>
      <ActivityIndicator visible={loading} />
      <FlatList
        data={followers}
        style={styles.container}
        keyExtractor={(user) => user.feed_id}
        ListEmptyComponent={<EmptyFollowing label="followers" />}
        ItemSeparatorComponent={UserCardSeparator}
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
