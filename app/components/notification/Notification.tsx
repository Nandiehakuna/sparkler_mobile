import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { NotificationActivity } from 'getstream';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { SparkleActivity } from '../../utils/types';
import { getFirstWord } from '../../utils/funcs';
import colors from '../../config/colors';
import Image from '../Image';
import Text from '../Text';

interface Props extends ViewProps {
  action: string;
  activityGroup: NotificationActivity;
  Icon: JSX.Element;
  Other?: JSX.Element;
  onPress: () => void;
}

export default (props: Props) => {
  const {
    action,
    activityGroup,
    children,
    Icon,
    style,
    Other,
    onPress,
    ...otherProps
  } = props;
  const { activities, actor_count, is_seen } = activityGroup;
  const sparkles = activities as unknown as SparkleActivity[];
  const firstSparkle = sparkles[0];

  return (
    <View>
      <TouchableOpacity
        style={[styles.container, !is_seen && styles.unseenContainer, style]}
        onPress={onPress}
        {...otherProps}
      >
        <View style={styles.iconContainer}>{Icon}</View>
        <View style={styles.childrenContainer}>
          <View style={styles.avatarsContainer}>
            {actor_count === 1 ? (
              <Image
                style={styles.avatar}
                uri={firstSparkle.actor.data.profileImage}
              />
            ) : (
              sparkles.map(({ actor, id }) => {
                const profileImage = actor.data.profileImage;

                return profileImage ? (
                  <Image key={id} style={styles.avatar} uri={profileImage} />
                ) : (
                  <View key={id} style={styles.avatar}>
                    <FontAwesome6
                      size={styles.avatar.height}
                      name="circle-user"
                      color={colors.medium}
                    />
                  </View>
                );
              })
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
    backgroundColor: colors.white,
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
