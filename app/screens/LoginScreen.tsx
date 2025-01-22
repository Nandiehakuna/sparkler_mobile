import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ActivityIndicator, PressableText, Text } from '../components';
import { DataError } from '../api/client';
import { ErrorMessage, Form, FormField, SubmitButton } from '../components/forms';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useAuthCode, useTheme, useUser } from '../hooks';
import authApi from '../api/auth';
import authStorage from '../auth/storage';
import colors from '../config/colors';

const schema = Yup.object().shape({
  authCode: Yup.number().required().min(4).label('Authentication code'),
  email: Yup.string().required().email().label('Email address'),
});

type LoginInfo = Yup.InferType<typeof schema>;

export default function LoginScreen({ navigation }: ScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const authCodeHandler = useAuthCode();

  const validateEmail = (): Promise<boolean> => schema.isValid({ email, authCode: 1000 });

  const requestAuthCode = async () => {
    const isValidEmail = await validateEmail();
    if (!isValidEmail) return setError('Enter a valid email address');

    setLoading(true);
    await authCodeHandler.requestAuthCode(isValidEmail, email);
    setLoading(false);
  };

  const login = async (email: string, authCode: number) => {
    setLoading(true);
    const res = await authApi.loginWithCode(email, authCode);
    setLoading(false);

    if (!res.ok) setError((res.data as DataError)?.error || 'Invalid email and/or auth code.');

    return res;
  };

  const handleSubmit = async (
    { email, authCode }: LoginInfo,
    { resetForm }: FormikHelpers<object>
  ) => {
    if (error) setError('');

    const { data, ok } = await login(email, authCode);
    if (!ok) return;

    resetForm();
    setEmail('');
    await authStorage.storeToken(data as string);
    setUser(await authStorage.getUser());
    navigation.replace(routes.HOME_NAVIGATOR);
  };

  if (user) {
    navigation.replace(routes.HOME_NAVIGATOR);
    return null;
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <ScrollView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
        <SafeAreaView style={styles.container}>
          <Text isBold style={styles.logo}>
            Sparkler
          </Text>
          <Form
            initialValues={{ email: '', authCode: '' }}
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
              placeholder="Email Address"
              textContentType="emailAddress"
              value={email}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              keyboardType="numeric"
              inputMode="numeric"
              name="authCode"
              placeholder="Auth Code"
            />
            <SubmitButton title="Login" />

            <PressableText onPress={requestAuthCode} style={styles.text}>
              {authCodeHandler.isRequestingAuthCode
                ? 'Requesting...'
                : 'Enter your email and press here to request the authentication code'}
            </PressableText>
          </Form>
        </SafeAreaView>
        <PressableText onPress={() => navigation.navigate(routes.REGISTER)} style={styles.text}>
          Don't have an account yet?
        </PressableText>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
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
