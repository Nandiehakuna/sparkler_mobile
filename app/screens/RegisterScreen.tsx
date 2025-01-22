import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ActivityIndicator, PressableText, Text } from '../components';
import { DataError } from '../api/client';
import { ErrorMessage, Form, FormField, SubmitButton } from '../components/forms';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useAuthCode, useTheme, useUser } from '../hooks';
import authStorage from '../auth/storage';
import colors from '../config/colors';
import usersApi from '../api/users';

const schema = Yup.object().shape({
  authCode: Yup.number().required().min(4).label('Authentication code'),
  email: Yup.string().email().required().label('Email Address'),
  name: Yup.string().required().label('Name'),
});

export type RegistrationInfo = Yup.InferType<typeof schema>;

export default ({ navigation }: ScreenProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const authCodeHandler = useAuthCode();

  const validateEmail = (): Promise<boolean> =>
    schema.isValid({ email, authCode: 1000, name: 'Test Name' });

  const requestAuthCode = async () => {
    const isValidEmail = await validateEmail();
    if (!isValidEmail) return setError('Enter a valid email address');

    setLoading(true);
    await authCodeHandler.requestAuthCode(isValidEmail, email);
    setLoading(false);
  };

  const handleSubmit = async (
    { authCode, email, name }: RegistrationInfo,
    { resetForm }: FormikHelpers<object>
  ) => {
    if (error) setError('');
    Keyboard.dismiss();

    const { data, ok } = await usersApi.register({ authCode, email, name });
    if (!ok) return setError((data as DataError)?.error || 'An unexpected error occurred.');

    await authStorage.storeToken(data as string);
    const user = await authStorage.getUser();
    if (user) {
      setEmail('');
      resetForm();
      setUser(user);
      navigation.replace(routes.PROFILE_UPDATE);
    }
  };

  if (user) {
    navigation.replace(routes.PROFILE_UPDATE);
    return null;
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <ScrollView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text isBold style={styles.logo}>
              Sparkler
            </Text>
            <Form
              initialValues={{ name: '', email: '', authCode: '' }}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              <ErrorMessage error={error} visible={!!error} />
              <FormField icon="account" placeholder="Name" name="name" autoComplete="off" />
              <FormField
                autoCapitalize="none"
                autoComplete="off"
                icon="email"
                keyboardType="email-address"
                name="email"
                onFormTextChange={setEmail}
                placeholder="Email Address"
                textContentType="emailAddress"
                value={email}
              />

              <PressableText onPress={requestAuthCode} style={styles.text}>
                {authCodeHandler.isRequestingAuthCode
                  ? 'Requesting, please wait...'
                  : 'Enter email & request auth code'}
              </PressableText>

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="code-braces"
                keyboardType="numeric"
                inputMode="numeric"
                name="authCode"
                placeholder="Auth Code"
              />
              <SubmitButton title="Register" />
            </Form>
          </View>
        </View>
        <PressableText
          onPress={() => navigation.navigate(routes.LOGIN)}
          style={[styles.text, styles.textButton]}
        >
          Have an account?
        </PressableText>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 40,
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  text: {
    color: colors.blue,
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  textButton: {
    marginTop: 5,
    marginBottom: 5,
  },
});
