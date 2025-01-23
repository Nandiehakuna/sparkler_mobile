import { useEffect, useState } from 'react';

import useUser from './useUser';
import useNotification from './useNotification';
import usersApi from '../api/users';
import useToast from './useToast';

interface Props {
  userId: string;
}

export default ({ userId }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { createNotification } = useNotification();
  const { user, setUser } = useUser();
  const toast = useToast();

  useEffect(() => {
    if (user && user.followingId) {
      setIsFollowing(userId in user.followingId);
    }
  }, [userId, user]);

  const toggleFollow = async () => {
    try {
      if (!user) return toast.show('Login to follow this user', 'success');

      const validFollowState = user._id !== userId;
      if (!validFollowState) return;

      const action = isFollowing ? 'unfollow' : 'follow';

      setIsFollowing(!isFollowing);
      if (action === 'follow') {
        setUser({
          ...user,
          followingId: {
            ...user.followersId,
            [userId]: userId,
          },
        });
        createNotification(userId, action);
      } else {
        const followingId = { ...user.followersId };
        delete followingId[userId];
        setUser({ ...user, followingId });
      }

      const res = await usersApi.followUser({ action, userId });
      if (!res.ok) toast.show(`Couldn't ${action} a user`, 'error');
    } catch (error) {
      console.log('Error following/unfollowing user', error);
    }
  };

  return { isFollowing, toggleFollow };
};
