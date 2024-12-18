import { useEffect, useState } from 'react';

import useStreamClient from './useStreamClient';
import useUser from './useUser';
import useNotification from './useNotification';

interface Props {
  userId: string;
}

export default ({ userId }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createNotification } = useNotification();
  const { user } = useUser();
  const client = useStreamClient();

  const invalidFollowState = !user || user._id === userId;

  useEffect(() => {
    async function init() {
      try {
        if (invalidFollowState) return;

        setLoading(true);
        const response = await client
          .feed('user', client.userId)
          .following({ filter: [`user:${userId}`] });
        setLoading(false);

        setIsFollowing(Boolean(response?.results.length));
      } catch (error) {}
    }

    init();
  }, [userId]);

  const toggleFollow = async () => {
    if (invalidFollowState) return;

    setIsFollowing(!isFollowing);
    const action = isFollowing ? 'unfollow' : 'follow';
    if (action === 'follow') await createNotification(userId, action);

    const timelineFeed = client?.feed('timeline', user._id);
    await timelineFeed?.[action]('user', userId);
    setIsFollowing((isFollowing) => !isFollowing);
  };

  async function isFollowingUserWithId(
    userId: string | undefined,
  ): Promise<boolean> {
    if (!userId) return false;

    const response = await client
      ?.feed('timeline', client.userId)
      .following({ filter: [`user:${userId}`] });

    return Boolean(response?.results.length);
  }

  return { isFollowing, isFollowingUserWithId, loading, toggleFollow };
};
