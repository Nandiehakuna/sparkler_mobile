import { StyleSheet, View } from 'react-native';
import { NotificationActivity } from 'getstream';

import { Sparkle } from '../sparkle';
import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const { activities, is_seen, verb } = activityGroup;

  if (verb === 'tweet' || verb === 'sparkle')
    return (
      <View style={!is_seen && styles.unseenContainer}>
        {activities.map((sparkle) => (
          <Sparkle key={sparkle.id} activity={sparkle} />
        ))}
      </View>
    );

  return null;
};

const styles = StyleSheet.create({
  text: { marginTop: 20, textAlign: 'center' },
  unseenContainer: {
    backgroundColor: colors.lightBlue,
  },
});
