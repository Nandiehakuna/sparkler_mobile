import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { ActorName, SparkleImage } from '../sparkle';
import { routes } from '../../navigation';
import { SparkleActivity } from '../../utils/types';
import { useNavigation, useProfileUser } from '../../hooks';
import Avatar from '../Avatar';
import colors from '../../config/colors';
import SparkleText from './SparkleText';
import Text from '../Text';

interface ReactionCounts {
  comment?: number;
  like?: number;
  resparkle?: number;
  quote?: number;
}

interface Props {
  activity: SparkleActivity;
}

const EmbeddedSparkleBlock: React.FC<Props> = ({ activity }) => {
  const navigation = useNavigation();
  const { viewProfile } = useProfileUser();

  const actor = activity.actor;
  const sparkle = activity.object.data;
  const reactionCounts: ReactionCounts = activity.reaction_counts || {};
  const commentCount = reactionCounts.comment || 0;
  const likeCount = reactionCounts.like || 0;
  const resparkleCount = reactionCounts.resparkle || 0;
  const quoteCount = reactionCounts.quote || 0;
  const images = activity.attachments?.images || [];

  const viewThread = () => navigation.navigate(routes.THREAD, activity);

  const visitProfile = () => viewProfile(actor);

  return (
    <View style={styles.embeddedBlock}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.embeddedUserImage} onPress={visitProfile}>
          <Avatar image={actor.data.profileImage} />
        </TouchableOpacity>
        <View style={styles.actorNameContainer}>
          <ActorName actor={actor} time={activity.time} onPress={visitProfile} />
        </View>
      </View>

      <SparkleText
        text={sparkle?.text || 'Project details could not be shown! Click to view it'}
        onReadMore={viewThread}
      />
      <SparkleImage images={images} />

      <View style={styles.reactionCountsComp}>
        {Boolean(commentCount) && (
          <Text style={styles.reactionText}>
            {commentCount} Comment{commentCount > 1 ? 's' : ''}
          </Text>
        )}
        {Boolean(likeCount) && (
          <Text style={styles.reactionText}>
            {likeCount} Like{likeCount > 1 ? 's' : ''}
          </Text>
        )}
        {Boolean(resparkleCount) && (
          <Text style={styles.reactionText}>
            {resparkleCount} Resparkle{resparkleCount > 1 ? 's' : ''}
          </Text>
        )}
        {Boolean(quoteCount) && (
          <Text style={styles.reactionText}>
            {quoteCount} Quote{quoteCount > 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </View>
  );
};

export default EmbeddedSparkleBlock;

const styles = StyleSheet.create({
  actorNameContainer: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 5,
  },
  embeddedBlock: {
    backgroundColor: 'inherit',
    borderColor: colors.light,
    borderRadius: 8,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 7,
  },
  embeddedUserImage: {
    width: 18,
    height: 18,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    width: '100%',
  },
  profileImage: {
    borderRadius: '100%',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reactionCountsComp: {
    marginTop: 1,
    fontSize: 12,
    color: '#aaa',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reactionText: {
    color: '#aaa',
  },
  time: {
    color: colors.medium,
    fontSize: 10,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  tweetDetails: {
    marginTop: 5,
  },
});
