import React from 'react';
import { View, Pressable, StyleSheet, Linking } from 'react-native';

import { getActorFromUser, parseHashtagsAndMentions } from '../../utils/funcs';
import { routes } from '../../navigation';
import { useNavigation, useUsers } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

export interface HashtagMentionPart {
  text: string;
  isMention?: boolean;
  isHashtag?: boolean;
  isLink?: boolean;
}

interface Props {
  onReadMore: () => void;
  text: string;
  textLimit?: number;
}

const LINE_CHARS = 40;

const SparkleText: React.FC<Props> = ({ onReadMore, text = '', textLimit = 280 }) => {
  const { usernameIdMap, idUserMap } = useUsers();
  const navigation = useNavigation();

  const handleHashtagPress = (hashtag: string) => navigation.navigate(routes.HASHTAG, { hashtag });

  const handleMentionPress = (username: string) => {
    const userId = usernameIdMap[username.replace('@', '')];
    if (!userId) return;

    const user = idUserMap[userId];
    navigation.navigate(routes.PROFILE, getActorFromUser(user));
  };

  const handlePress = async (item: HashtagMentionPart) => {
    if (item.isMention) {
      const mentionWithoutSign = item.text.slice(1);
      handleMentionPress(mentionWithoutSign);
    } else if (item.isHashtag) {
      const hashtagWithoutSign = item.text.slice(1);
      handleHashtagPress(hashtagWithoutSign);
    } else if (item.isLink) await Linking.openURL(item.text);
  };

  return (
    <View style={styles.container}>
      <Text numberOfLines={Math.ceil(textLimit / LINE_CHARS)}>
        {parseHashtagsAndMentions(text).map((part, index) =>
          part.isMention || part.isHashtag || part.isLink ? (
            <Text key={index} onPress={() => handlePress(part)} style={styles.highlightedText}>
              {' '}
              {part.text}
            </Text>
          ) : (
            <Text key={index}>{part.text}</Text>
          )
        )}
      </Text>
      {text.length > textLimit && (
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

export default SparkleText;
