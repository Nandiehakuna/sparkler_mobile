import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { NotificationActivity } from 'getstream';

import { SparkleActivity } from '../../utils/types';
import { getFirstWord } from '../../utils/funcs';
import { useTheme } from '../../hooks';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import Text from '../Text';

interface Props extends ViewProps {
  action: string;
  activityGroup: NotificationActivity;
  Icon: JSX.Element;
  Other?: JSX.Element;
  onPress: () => void;
}

export default (props: Props) => {
  const { theme } = useTheme();

  const { action, activityGroup, children, Icon, style, Other, onPress, ...otherProps } = props;
  const { activities, actor_count, is_seen } = activityGroup;
  const sparkles = activities as unknown as SparkleActivity[];
  const firstSparkle = sparkles[0];

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          !is_seen && styles.unseenContainer,
          style,
          { backgroundColor: theme.colors.background },
        ]}
        onPress={onPress}
        {...otherProps}
      >
        <View style={styles.iconContainer}>{Icon}</View>
        <View style={styles.childrenContainer}>
          <View style={styles.avatarsContainer}>
            {actor_count === 1 ? (
              <Avatar style={styles.avatar} image={firstSparkle.actor.data.profileImage} />
            ) : (
              sparkles.map(({ actor, id }) => (
                <Avatar key={id} style={styles.avatar} image={actor.data.profileImage} />
              ))
            )}
          </View>
          <View style={styles.textContainer}>
            <Text isBold>{getFirstWord(sparkles[0].actor.data.name)}</Text>
            {actor_count > 1 && (
              <Text>
                {' '}
                and {actor_count - 1} other{actor_count - 1 > 1 ? 's' : ''}{' '}
              </Text>
            )}
            <Text> {action}</Text>
          </View>
          {children}
        </View>
      </TouchableOpacity>

      {Other}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 14,
    height: 28,
    marginRight: 6,
    width: 28,
  },
  avatarsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 3,
  },
  childrenContainer: {
    flex: 1,
  },
  container: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  iconContainer: {
    marginHorizontal: 5,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: 'row',
  },
  unseenContainer: {
    backgroundColor: colors.lightBlue,
  },
});
