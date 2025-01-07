import { useState } from 'react';
import { View, Image, TextInput, StyleSheet, ScrollView } from 'react-native';

import { ActorName } from '../components/sparkle';
import { ErrorMessage } from '../components/forms';
import { ScreenProps, SparkleActivity } from '../utils/types';
import { Avatar, Screen, Text } from '../components';
import { useComment, useToast, useUser } from '../hooks';
import colors from '../config/colors';
import Header from '../components/screen/Header';

export default function CommentScreen({ route, navigation }: ScreenProps) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const helper = useComment();
  const toast = useToast();

  const activity = route.params.activity as SparkleActivity;
  const buttonDisabled: boolean = !comment.length || loading;

  const handleComment = async () => {
    if (!user || buttonDisabled) return;
    if (error) setError('');

    setLoading(true);
    const res = await helper.handleComment(activity, comment);
    setLoading(false);

    if (res.ok) {
      toast.show('Comment sent', 'success');
      setComment('');
      navigation.goBack();
    } else {
      setError('Comment not sent!');
      toast.show("Comment couldn't be sent", 'error');
    }
  };

  return (
    <>
      <Header
        buttonTitle="Comment"
        disable={buttonDisabled}
        onButtonPress={handleComment}
        loading={loading}
      />

      <ScrollView style={styles.container}>
        <View style={styles.sparkleContainer}>
          <View>
            <View style={styles.row}>
              <Image source={{ uri: activity.actor.data.profileImage }} style={styles.avatar} />
              <View style={styles.postContent}>
                <ActorName actor={activity.actor} time={activity.time} />
                <View style={styles.textImageRow}>
                  <Text style={styles.text}>{activity.object.data.text}</Text>
                  {activity.attachments?.images && (
                    <Image
                      source={{ uri: activity.attachments.images[0] }}
                      style={styles.smallMedia}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.replyLine} />
          <View style={styles.replyContainer}>
            <Avatar image={user?.profileImage} style={styles.avatar} />
            <TextInput
              autoFocus
              multiline
              onChangeText={setComment}
              placeholder="Write your comment..."
              style={styles.replyInput}
              value={comment}
            />
          </View>
          <ErrorMessage error={error} visible={Boolean(error.length)} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  actionText: {
    color: colors.blue,
    fontSize: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  container: { backgroundColor: colors.white, flex: 1 },
  media: {
    marginTop: 8,
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  postContent: {
    flex: 1,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  replyInput: {
    backgroundColor: colors.light,
    flex: 1,
    color: colors.medium,
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    minHeight: 50,
  },
  replyLine: {
    backgroundColor: colors.medium,
    borderRadius: 10,
    height: 140,
    marginBottom: 10,
    marginLeft: 20,
    width: 1.5,
  },
  row: {
    flexDirection: 'row',
  },
  smallMedia: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    resizeMode: 'cover',
  },
  sparkleContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  text: {
    fontSize: 14,
    color: colors.medium,
    marginBottom: 10,
  },
  textImageRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
