import { useEffect, useState } from 'react';

import useStreamClient from './useStreamClient';
import useUser from './useUser';
import useNotification from './useNotification';
import useToast from './useToast';

interface Props {
  userId: string;
}

export default ({ userId }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { createNotification } = useNotification();
  const { user, setUser } = useUser();
  const client = useStreamClient();
  const toast = useToast();

  useEffect(() => {
    const followersId = user?.followersId || {};
    setIsFollowing(userId in followersId);
  }, []);

  const toggleFollow = async () => {
    if (!user) return toast.show('Login to follow this user', 'success');

    const validFollowState = user._id !== userId;
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
