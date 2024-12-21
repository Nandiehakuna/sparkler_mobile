import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { getActorFromUser } from '../../utils/funcs';
import { routes } from '../../navigation';
import { useNavigation, useUsers } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

interface Part {
  text: string;
  isMention?: boolean;
  isHashtag?: boolean;
}

interface Props {
  onReadMore: () => void;
  text: string;
}

const CustomTextComponent: React.FC<Props> = ({ onReadMore, text }) => {
  const { usernameIdMap, idUserMap } = useUsers();
  const navigation = useNavigation();

  const parseText = (str: string): Part[] => {
    const parts: Part[] = [];
    let match;
    let lastIndex = 0;

    const regex = /(^|\s)(#[a-z\d-]+|[@][a-z\d-]+)/gi; // Regex for hashtags and mentions

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: str.slice(lastIndex, match.index) });
      }

      parts.push({
        text: match[2],
        isMention: match[2].startsWith('@'),
        isHashtag: match[2].startsWith('#'),
      });

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) parts.push({ text: str.slice(lastIndex) });

    return parts;
  };

  const parsedText = parseText(text);

  const handleHashtagPress = (hashtag: string) =>
    navigation.navigate(routes.HASHTAG, { hashtag });

  const handleMentionPress = (username: string) => {
    const userId = usernameIdMap[username.replace('@', '')];
    if (!userId) return;

    const user = idUserMap[userId];
    navigation.navigate(routes.PROFILE, getActorFromUser(user));
  };

  const handlePress = (item: Part) => {
    if (item.isMention) {
      const mentionWithoutSign = item.text.slice(1);
      handleMentionPress(mentionWithoutSign);
    } else if (item.isHashtag) {
      const hashtagWithoutSign = item.text.slice(1);
      handleHashtagPress(hashtagWithoutSign);
    }
  };

  return (
    <View style={styles.container}>
      {parsedText.map((part, index) =>
        part.isMention || part.isHashtag ? (
          <Pressable key={index} onPress={() => handlePress(part)}>
            <Text style={styles.highlightedText}>{part.text}</Text>
          </Pressable>
        ) : (
          <Text key={index}>{part.text}</Text>
        ),
      )}
      {text.length > 280 && (
        <Pressable onPress={onReadMore}>
          <Text style={styles.readMore}>Read more</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  highlightedText: {
    color: colors.blue,
  },
  readMore: {
    color: colors.blue,
    marginLeft: 5,
  },
});

export default CustomTextComponent;
