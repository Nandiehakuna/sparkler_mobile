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
  const { user, setUser } = useUser();
  const client = useStreamClient();

  useEffect(() => {
    setIsFollowing(userId in user.followersId);
  }, []);

  const toggleFollow = async () => {
    const validFollowState = user?._id !== userId;
    if (!validFollowState) return;

    setIsFollowing(!isFollowing);
    const action = isFollowing ? 'unfollow' : 'follow';
    if (action === 'follow') {
      setUser({
        ...user,
        followersId: {
          ...user.followersId,
          [userId]: userId,
        },
      });
      createNotification(userId, action);
    } else {
      const followersId = { ...user.followersId };
      delete followersId[userId];
      setUser({ ...user, followersId });
    }

    const timelineFeed = client?.feed('timeline', user._id);
    await timelineFeed?.[action]('user', userId);
  };

  return { isFollowing, toggleFollow };
};
