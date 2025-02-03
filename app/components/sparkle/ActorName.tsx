import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ActivityActor } from '../../utils/types';
import { getTimeText } from '../../utils/time';
import { MoreIcon } from '../icons';
import colors from '../../config/colors';
import Text from '../Text';
import useTheme from '../../hooks/useTheme';

type ScenarioOneProps = {
  actor: ActivityActor;
  time: string | Date | number;
  onPress?: () => void;
  showMoreIcon: boolean;
  onMoreIconPress: () => void;
};

type ScenarioTwoProps = {
  actor: ActivityActor;
  time: string | Date | number;
  onPress?: () => void;
  showMoreIcon?: undefined;
  onMoreIconPress?: undefined;
};

export default function ActivityActorName(props: ScenarioOneProps | ScenarioTwoProps) {
  const { actor, showMoreIcon, time, onMoreIconPress, onPress } = props;
  const { isAdmin, name, username, verified } = actor.data;
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={[styles.name, { color: theme.colors.text }]} isBold>
          {name}
        </Text>
        {verified && (
          <Image
            source={
              isAdmin ? require('../../assets/admin.png') : require('../../assets/verified.png')
            }
            style={styles.verifiedIcon}
          />
        )}
        <Text numberOfLines={1} style={styles.username}>
          @{username}
        </Text>
        <Text style={styles.time}> . {getTimeText(time)}</Text>
      </View>
      {showMoreIcon && <MoreIcon onPress={onMoreIconPress} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    flexShrink: 1,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  time: {
    fontSize: 12,
    flexShrink: 0,
  },
  username: {
    fontSize: 17,
    color: colors.medium,
    flexShrink: 1,
  },
  verifiedIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});
