import { useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ActivityIndicator, Button, PressableText, Text } from '../components';
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
    const res = await authApi.loginWithCode(email, authCode);

    if (!res.ok) setError((res.data as DataError)?.error || 'Invalid email and/or auth code.');

    return res;
  };

  const handleSubmit = async (
    { email, authCode }: LoginInfo,
    { resetForm }: FormikHelpers<object>
  ) => {
    if (error) setError('');
    Keyboard.dismiss();

    setLoading(true);
    const { data, ok } = await login(email, authCode);
    if (!ok) return setLoading(false);

    resetForm();
    setEmail('');
    await authStorage.storeToken(data as string);
    setUser(await authStorage.getUser());
    setLoading(false);

    navigation.replace(routes.APP_DRAWER);
  };

  if (user)
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>This is login screen. You're already signed in.</Text>
        <Button title="Go Home" onPress={() => navigation.replace(routes.APP_DRAWER)} />
      </View>
    );

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

            <PressableText onPress={requestAuthCode} style={styles.text}>
              {authCodeHandler.isRequestingAuthCode
                ? 'Requesting, please wait...'
                : 'Press to get your auth code'}
            </PressableText>

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
  infoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    textAlign: 'center',
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
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
});
