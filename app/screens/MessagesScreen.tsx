import { useEffect, useState } from 'react';
import { Channel as ChannelType, DefaultGenerics, StreamChat, UserResponse } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
  ChannelList,
  DefaultStreamChatGenerics,
  MessageType,
  Thread,
} from 'stream-chat-expo';
import { STREAM_API_KEY } from '@env';
import moment from 'moment';

import { ScreenProps } from '../utils/types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from '../components';
import { useTheme, useUser } from '../hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import routes from '../navigation/routes';

const client: StreamChat<DefaultStreamChatGenerics> = StreamChat.getInstance(STREAM_API_KEY);

export default ({ navigation, route }: ScreenProps) => {
  const { user } = useUser();
  const [channel, setChannel] = useState<ChannelType<DefaultGenerics>>();
  const [thread, setThread] = useState<MessageType>();
  const [chatUser, setChatUser] = useState<UserResponse<DefaultStreamChatGenerics>>();
  const { theme } = useTheme();

  const userId = route.params?.userId;

  useEffect(() => {
    const connectUser = async () => {
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
    };

    connectUser();
  }, []);

  useEffect(() => {
    const createDMChannel = async () => {
      if (!user?._id || !userId) return;

      const channel = client.channel('messaging', {
        members: [user?._id, userId],
      });
      await channel.watch();

      setChannel(channel);
    };

    createDMChannel();
  }, [userId]);

  const handleChannelSelect = (channel: ChannelType<DefaultStreamChatGenerics>) => {
    const otherMember = Object.values(channel.state.members).find(
      (member) => member.user.id !== user._id
    );

    setChatUser(otherMember?.user);
    setChannel(channel);
  };

  const getLastActive = () => {
    if (!chatUser) return 'Offline';
    return chatUser.online ? 'Online' : `Last active ${moment(chatUser.last_active).fromNow()}`;
  };

  if (!user) {
    navigation.navigate(routes.AUTH);
    return null;
  }

  return (
    <>
      <OverlayProvider>
        <Chat client={client}>
          {channel ? (
            <Channel
              channel={channel}
              keyboardVerticalOffset={0}
              thread={thread}
              threadList={!!thread}
            >
              <View
                style={[
                  styles.header,
                  {
                    backgroundColor: theme.colors.background,
                    borderBottomColor: theme.colors.border,
                  },
                ]}
              >
                <TouchableOpacity onPress={() => setChannel(undefined)}>
                  <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>

                {chatUser && (
                  <View style={styles.userInfo}>
                    <Avatar image={chatUser.image} style={styles.avatar} />
                    <View>
                      <Text isBold style={[styles.userName, { color: theme.colors.text }]}>
                        {chatUser.name}
                      </Text>
                      <Text
                        style={[
                          styles.status,
                          { color: chatUser.online ? 'green' : theme.colors.text },
                        ]}
                      >
                        {getLastActive()}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {thread ? (
                <Thread />
              ) : (
                <>
                  <MessageList onThreadSelect={setThread} />
                  <MessageInput />
                </>
              )}
            </Channel>
          ) : (
            <View
              style={[styles.channelListContainer, { backgroundColor: theme.colors.background }]}
            >
              <Text isBold style={[styles.channelListTitle, { color: theme.colors.text }]}>
                Messages
              </Text>
              <ChannelList
                filters={{ members: { $in: [user?._id] } }}
                onSelect={handleChannelSelect}
              />
            </View>
          )}
        </Chat>
      </OverlayProvider>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  channelListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  channelListTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  status: {
    fontSize: 14,
  },
  userInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
