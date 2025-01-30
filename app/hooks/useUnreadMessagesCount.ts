import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY } from '@env';
import { DefaultStreamChatGenerics } from 'stream-chat-expo';

import useUser from './useUser';

const client: StreamChat<DefaultStreamChatGenerics> = StreamChat.getInstance(STREAM_API_KEY);

const useUnreadMessagesCount = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { user } = useUser();

  useEffect(() => {
    if (!client) return;

    const fetchUnreadCount = async () => {
      try {
        await connectUser();

        const count = await client?.getUnreadCount();
        setUnreadCount(count.total_unread_count || 0);
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    };

    fetchUnreadCount();

    const handleNewMessage = () => fetchUnreadCount();
    const handleReadMessage = () => fetchUnreadCount();

    client.on('message.new', handleNewMessage);
    client.on('message.read', handleReadMessage);

    return () => {
      client.off('message.new', handleNewMessage);
      client.off('message.read', handleReadMessage);
      client.disconnectUser();
    };
  }, [client]);

  async function connectUser() {
    try {
      if (user)
        await client.connectUser(
          {
            id: user._id,
            name: user.name,
            image: user.profileImage,
          },
          user.chatToken
        );
    } catch (error) {
      console.error(error);
    }
  }

  return { unreadCount };
};

export default useUnreadMessagesCount;
