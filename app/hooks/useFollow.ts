import { useEffect, useState } from 'react';

import useStreamClient from './useStreamClient';
import useUser from './useUser';
import useNotification from './useNotification';

interface Props {
  userId: string;
}

export default ({ userId }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { createNotification } = useNotification();
  const { user } = useUser();
  const client = useStreamClient();

  const validFollowState = user?._id !== userId;

  useEffect(() => {
    async function init() {
      if (validFollowState) setIsFollowing(Boolean(user.followersId[userId]));
    }

    init();
  }, [userId]);

  const toggleFollow = async () => {
    if (validFollowState) return;

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

  return { isFollowing, isFollowingUserWithId, toggleFollow };
};
