import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ActivityIndicator, PressableText, Screen } from '../components';
import { DataError } from '../api/client';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms';
import { ScreenProps } from '../utils/types';
import { useAuthCode, useUser } from '../hooks';
import authApi from '../api/auth';
import authStorage from '../auth/storage';
import colors from '../config/colors';

const schema = Yup.object().shape({
  code: Yup.number().required().min(4).label('Authentication code'),
  email: Yup.string().required().email().label('Email address'),
});

type LoginInfo = Yup.InferType<typeof schema>;

export default function LoginScreen({ navigation }: ScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const authCodeHandler = useAuthCode();

  const validateEmail = (): Promise<boolean> =>
    schema.isValid({ email, code: 1000 });

  const requestAuthCode = async () =>
    authCodeHandler.requestAuthCode(await validateEmail(), email);

  const login = async (email: string, code: number) => {
    setLoading(true);
    const res = await authApi.loginWithCode(email, code);
    setLoading(false);

    if (!res.ok)
      setError(
        (res.data as DataError)?.error || 'Invalid email and/or auth code.',
      );

    return res;
  };

  const handleSubmit = async (
    { email, code }: LoginInfo,
    { resetForm }: FormikHelpers<object>,
  ) => {
    if (error) setError('');

    const { data, ok } = await login(email, code);
    if (!ok) return;

    resetForm();
    await authStorage.storeToken(data as string);
    setUser(await authStorage.getUser());
  };

  if (user) {
    navigation.goBack();
    return null;
  }

  return (
    <Screen>
      <ScrollView style={styles.screen}>
        <SafeAreaView style={styles.container}>
          {loading && <ActivityIndicator />}
          <Image style={styles.logo} source={require('../assets/icon.png')} />
          <Form
            initialValues={{ email: '', code: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <ErrorMessage error={error} visible={Boolean(error.length)} />
            <FormField
              autoCapitalize="none"
              autoComplete="off"
              icon="email"
              keyboardType="email-address"
              name="email"
              onFormTextChange={setEmail}
              placeholder="Email"
              textContentType="emailAddress"
              value={email}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              keyboardType="numeric"
              inputMode="numeric"
              name="code"
              placeholder="Auth Code"
            />
            <SubmitButton title="Login" />

            <PressableText onPress={requestAuthCode} style={styles.text}>
              {authCodeHandler.isRequestingAuthCode
                ? 'Requesting...'
                : 'Request Auth Code'}
            </PressableText>
          </Form>
        </SafeAreaView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  text: {
    color: colors.blue,
    marginTop: 15,
    textAlign: 'center',
  },
});
