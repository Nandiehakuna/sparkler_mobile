import { Activity, NotificationActivity } from 'getstream';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { getFirstWord } from '../../utils/funcs';
import { LikeIcon } from '../icons';
import { routes } from '../../navigation';
import { SparkleActivity } from '../../utils/types';
import { useNavigation } from '../../hooks';
import colors from '../../config/colors';
import Image from '../Image';
import Text from '../Text';

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const navigation = useNavigation();

  const { activities, actor_count } = activityGroup;
  const sparkles = activities as unknown as SparkleActivity[];
  const likedSparkle = sparkles[0].object as unknown as Activity;
  const likedGroup: { [id: string]: SparkleActivity[] } = {};

  (activities as unknown as SparkleActivity[]).forEach((sparkle) => {
    if (sparkle.object.id in likedGroup) {
      likedGroup[sparkle.object.id].push(sparkle);
    } else likedGroup[sparkle.object.id] = [sparkle];
  });

  return (
    <View>
      {Object.keys(likedGroup).map((groupKey) => {
        const sparkles = likedGroup[groupKey];
        const { actor, object } = sparkles[0];

        return (
          <View style={styles.container} key={groupKey}>
            <View style={styles.iconContainer}>
              <LikeIcon liked size={24} />
            </View>
            {sparkles.map((sparkle) => (
              <TouchableOpacity
                key={sparkle.id}
                onPress={() => navigation.navigate(routes.THREAD, sparkle)}
              >
                <Image
                  uri={sparkle.actor.data.profileImage}
                  style={styles.avatar}
                />
                {/* TODO: show the names of the lovers */}
                <View style={styles.textContainer}>
                  {actor_count > 1 && (
                    <Text>
                      <Text isBold>{getFirstWord(actor.data.name)}</Text> and{' '}
                      {actor_count - 1} other
                      {actor_count - 1 > 1 ? 's' : ''} liked your sparkle
                    </Text>
                  )}
                </View>
                {object.data?.text && (
                  <Text numberOfLines={1}>
                    {`"${object.data?.text}"` || ''}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
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
});
