import { useEffect, useState } from 'react';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import {
Chat,
Channel,
ChannelList,
OverlayProvider,
DefaultStreamChatGenerics,
Thread,
MessageList,
MessageInput,
MessageType,
DeepPartial,
Theme,
} from 'stream-chat-react-native';
import { STREAM_API_KEY } from '@env';

import { ScreenProps } from '../utils/types';
import { useTheme, useUser } from '../hooks';
import routes from '../navigation/routes';

const client = StreamChat.getInstance(STREAM_API_KEY);

export default ({ navigation, route }: ScreenProps) => {
const { user } = useUser();
const [channel, setChannel] = useState<ChannelType<DefaultStreamChatGenerics>>();
const [thread, setThread] = useState<MessageType>();
const { theme } = useTheme();

const chatTheme: DeepPartial<Theme> = {
messageSimple: {
file: {
container: {
backgroundColor: theme.colors.background,
},
},
},
};

useEffect(() => {
const initChatClient = async () => {
await client.connectUser(
{
id: user.\_id,
name: user.name,
image: user.profileImage,
},
user.chatToken
);
};

    initChatClient();

}, []);

useEffect(() => {
const createDMChannel = async () => {
const { userId } = route.params;
if (!user?.\_id || !userId) return;

      const channel = client.channel('messaging', {
        members: [user?._id, userId],
      });
      await channel.watch();

      setChannel(channel);
    };

    createDMChannel();

}, []);

if (!user) {
navigation.navigate(routes.AUTH);
return null;
}

return (
<OverlayProvider value={{ style: chatTheme }}>
<Chat client={client}>
{channel ? (
<Channel
            channel={channel}
            keyboardVerticalOffset={0}
            thread={thread}
            threadList={!!thread}
          >
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
<ChannelList
onSelect={(channel) =>
setChannel(channel as unknown as ChannelType<DefaultStreamChatGenerics>)
}
/>
)}
</Chat>
</OverlayProvider>
);
};
