import React = require('react');
import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from '../components';
import { Form, FormField, SubmitButton } from '../components/forms';
import { validationSchema, FormValues } from '../utils/validationSchema';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../navigation';
import Header from '../components/screen/Header';

const initialValues: FormValues = {
  feedback: '',
  name: '',
};

function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();

  // const handleSubmit = (values: FormValues) => {
  //   console.log(values);
  //   Alert.alert('success', 'thankyou for your feedback ', [
  //     {
  //       text: 'ok',
  //       // onPress: () => navigation.navigate(routes.HOME_NAVIGATOR),
  //     },
  //   ]);
  // };
  return (
    <View style={styles.container}>
      <Header buttonTitle="back" onButtonPress={() => navigation.goBack()} />
      <Form
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <View>
          <Text isBold style={styles.Title}>
            Give Feedback
          </Text>
          <Text style={styles.subTitle}>
            {' '}
            Your thoughts are valuable in helping improve our products.
          </Text>
          <FormField
            name="feedback"
            placeholder="let us know whats on your mind"
            onFormTextChange={setFeedback}
            style={styles.input}
          />
          <SubmitButton title="submit feedback" />
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  Title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },

  subTitle: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    height: 200,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});

export default FeedbackScreen;
