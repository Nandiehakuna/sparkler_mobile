import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ActorName } from '../sparkle';
import { Comment } from '../../utils/types';
import { MAX_NO_OF_LINES } from '../sparkle/Sparkle';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import Text from '../Text';

export default ({ user, data, created_at }: Comment) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const visitProfile = () => {}; //TODO: add the logic to visit the profile

  const handleTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > MAX_NO_OF_LINES) setIsTruncated(true);
  };

  return (
    <View style={styles.container}>
      <Avatar
        image={user.data.profileImage}
        onPress={visitProfile}
        style={styles.profileImage}
      />

      <View style={styles.contentContainer}>
        <ActorName actor={user} time={created_at} onPress={visitProfile} />

        <Text
          style={styles.text}
          numberOfLines={isExpanded ? undefined : MAX_NO_OF_LINES}
          onTextLayout={handleTextLayout}
        >
          {data?.text}
        </Text>

        {isTruncated && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.readMore} isBold>
              {isExpanded ? 'Show less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBlockColor: colors.light,
    flexDirection: 'row',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  readMore: {
    color: colors.blue,
    fontSize: 14,
    marginTop: 4,
  },
  text: {
    fontSize: 15,
    color: colors.medium,
    lineHeight: 20,
    flexWrap: 'wrap',
    overflow: 'hidden',
    width: '100%',
  },
});
