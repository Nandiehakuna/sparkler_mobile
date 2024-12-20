import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextProps } from 'react-native';

import { routes } from '../../navigation';
import { getActorFromUser } from '../../utils/funcs';
import { useNavigation, useUsers } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

interface Props extends TextProps {
  children: string;
  numberOfLines: number;
  onReadMore: (value: boolean) => void;
}

const TruncatedText = (props: Props) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const { usernameIdMap, idUserMap } = useUsers();
  const navigation = useNavigation();

  const { children, numberOfLines, onReadMore } = props;

  const handleToggleText = () => {
    setIsTruncated(!isTruncated);
    onReadMore?.(!isTruncated);
  };

  const handleHashtagPress = (hashtag: string) =>
    navigation.navigate(routes.HASHTAG, { hashtag });

  const handleMentionPress = (username: string) => {
    const userId = usernameIdMap[username.replace('@', '')];
    if (!userId) return;

    const user = idUserMap[userId];
    navigation.navigate(routes.PROFILE, getActorFromUser(user));
  };

  const renderText = (text: string) => {
    const parts = text.split(/(\s+)/).map((part, index) => {
      if (part.startsWith('#'))
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleHashtagPress(part)}
          >
            <Text style={styles.link}>{part}</Text>
          </TouchableOpacity>
        );
      else if (part.startsWith('@'))
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleMentionPress(part)}
          >
            <Text style={styles.link}>{part}</Text>
          </TouchableOpacity>
        );

      return part;
    });

    return parts;
  };

  return (
    <View>
      <Text
        numberOfLines={isTruncated ? undefined : numberOfLines}
        style={styles.text}
      >
        {renderText(children)}
        {!isTruncated && (
          <TouchableOpacity onPress={handleToggleText}>
            <Text style={styles.readMore}> Read more</Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: colors.medium,
    lineHeight: 20,
  },
  link: {
    fontSize: 15,
    color: colors.blue,
  },
  readMore: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: '500',
  },
  showLess: {
    fontSize: 14,
    color: 'blue',
    marginTop: 4,
  },
});

export default TruncatedText;
