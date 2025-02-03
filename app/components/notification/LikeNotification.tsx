import { NotificationActivity } from 'getstream';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ActivityActor, SparkleActivity } from '../../utils/types';
import { getActorFromUser, getFirstWord } from '../../utils/funcs';
import { LikeIcon } from '../icons';
import { routes } from '../../navigation';
import { useNavigation, useTheme, useUser } from '../../hooks';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  activityGroup: NotificationActivity;
}

function getUniqueActors(actors: ActivityActor[]): ActivityActor[] {
  const ids = new Set<string>();
  const unique: ActivityActor[] = [];

  actors.forEach((actor) => {
    if (!ids.has(actor.id)) {
      unique.push(actor);
      ids.add(actor.id);
    }
  });

  return unique;
}

export default ({ activityGroup }: Props) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user } = useUser();

  const { activities, actor_count } = activityGroup;
  const likedGroup = getLikedGroup();

  function getLikedGroup(): { [id: string]: SparkleActivity[] } {
    const likedGroup: { [id: string]: SparkleActivity[] } = {};

    (activities as unknown as SparkleActivity[]).forEach((sparkle) => {
      sparkle.object.id in likedGroup
        ? likedGroup[sparkle.object.id].push(sparkle)
        : (likedGroup[sparkle.object.id] = [sparkle]);
    });

    return likedGroup;
  }

  if (!user) return null;

  return (
    <View>
      {Object.keys(likedGroup).map((groupKey) => {
        const sparkles = likedGroup[groupKey];
        const { object } = sparkles[0];

        const actors = getUniqueActors(sparkles.map((sparkle) => sparkle.actor));

        return (
          <TouchableOpacity
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            key={groupKey}
            onPress={() =>
              navigation.navigate(routes.THREAD, {
                object,
                actor: getActorFromUser(user),
              })
            }
          >
            <View style={styles.iconContainer}>
              <LikeIcon liked size={24} />
            </View>

            <View>
              <FlatList
                data={actors}
                keyExtractor={(actor) => actor.id}
                horizontal
                renderItem={({ item: actor }) => (
                  <Avatar image={actor.data.profileImage} style={styles.avatar} />
                )}
              />

              <View style={styles.textContainer}>
                <Text>
                  <Text isBold>{getFirstWord(actors[0].data.name)}</Text>
                  {actor_count > 1 ? ' and' : ''} {actor_count > 1 && actor_count - 1}
                  {actor_count > 1 && ' other'}
                  {actor_count - 1 > 1 && 's'} liked your sparkle
                </Text>
              </View>

              {Boolean(object.data?.text) && (
                <Text numberOfLines={1}>{`"${object.data?.text}"` || ''}</Text>
              )}
            </View>
          </TouchableOpacity>
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
  },
  iconContainer: {
    marginHorizontal: 5,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: 'row',
  },
});
