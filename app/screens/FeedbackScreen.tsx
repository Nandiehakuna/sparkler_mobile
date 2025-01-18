import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { DataError } from '../api/client';
import { Form, FormField, SubmitButton } from '../components/forms';
import { ActivityIndicator, Text } from '../components';
import { useToast } from '../hooks';
import feedbackApi from '../api/feedback';
import Header from '../components/screen/Header';

const schema = Yup.object().shape({
  message: Yup.string().min(3).max(255).required().label('Message'),
});

type Feedback = Yup.InferType<typeof schema>;

function FeedbackScreen() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const handleSubmit = async ({ message }: Feedback) => {
    if (error) setError('');
    if (!message) return setError('Feedback message cannot be empty');

    setLoading(true);
    const res = await feedbackApi.saveFeedback({ message });
    setLoading(false);

    if (res.ok) {
      toast.show('Feedback saved! Thank you', 'success');
      navigation.goBack();
    } else {
      setError((res.data as DataError).error || 'Something failed');
      toast.show('Feedback not saved', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <Header loading={loading} buttonTitle="..." disable onButtonPress={() => {}} />
      <Form initialValues={{ message: '' }} onSubmit={handleSubmit} validationSchema={schema}>
        <Text isBold style={styles.title}>
          Give Feedback
        </Text>
        <Text style={styles.subTitle}>
          Your thoughts are valuable in helping improve our products.
        </Text>
        <FormField name="message" placeholder="What's on your mind" />
        <SubmitButton title="Submit feedback" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  subTitle: {
    marginBottom: 20,
  },
});

export default FeedbackScreen;
