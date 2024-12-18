import { View } from 'react-native';
import { NotificationActivity } from 'getstream';

import { Sparkle } from '../sparkle';

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const { activities, verb } = activityGroup;

  if (verb === 'tweet' || verb === 'sparkle')
    return (
      <View>
        {activities.map((sparkle) => (
          <Sparkle key={sparkle.id} activity={sparkle} />
        ))}
      </View>
    );

  return null;
};
