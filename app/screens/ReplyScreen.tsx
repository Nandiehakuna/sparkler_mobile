import { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Keyboard } from 'react-native';

import { ActivityIndicator, Avatar, Text } from '../components';
import { ActorName } from '../components/sparkle';
import { ErrorMessage } from '../components/forms';
import { Comment, ScreenProps } from '../utils/types';
import { useReply, useTheme, useToast, useUser } from '../hooks';
import colors from '../config/colors';
import Header from '../components/screen/Header';

export default function CommentScreen({ route, navigation }: ScreenProps) {
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { user } = useUser();
  const helper = useReply();
  const toast = useToast();

  const comment = route.params as Comment;
  const buttonDisabled: boolean = !reply.length || loading;

  const handleComment = async () => {
    if (!user) return toast.show('Login to save reply', 'success');
    if (buttonDisabled) return;
    if (error) setError('');
    Keyboard.dismiss();

    setLoading(true);
    const res = await helper.handleReply(comment, reply);
    setLoading(false);

    if (res.ok) {
      toast.show('Reply sent', 'success');
      setReply('');
      navigation.goBack();
    } else {
      setError('Reply not sent!');
      toast.show("Reply couldn't be sent", 'error');
    }
  };

  return (
    <>
      <Header
        buttonTitle="Reply"
        disable={buttonDisabled}
        onButtonPress={handleComment}
        loading={loading}
      />
      <ActivityIndicator visible={loading} />

      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.sparkleContainer}>
          <View>
            <View style={styles.row}>
              <Avatar image={comment.user.data.profileImage} style={styles.avatar} />
              <View style={styles.postContent}>
                <ActorName actor={comment.user} time={comment.created_at} />
                <View style={styles.textImageRow}>
                  <Text style={styles.text}>{comment.data.text}</Text>
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
              onChangeText={setReply}
              placeholder="Write your reply..."
              style={styles.replyInput}
              value={reply}
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
  container: { flex: 1 },
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
    fontFamily: 'Quicksand_400Regular',
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
    padding: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  textImageRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
