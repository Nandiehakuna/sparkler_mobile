import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { DataError } from '../api/client';
import { ErrorMessage, Form, FormField, SubmitButton } from '../components/forms';
import { PressableText } from '../components';
import { ScreenProps } from '../utils/types';
import { useApi, useAuthCode, useUser } from '../hooks';
import authApi from '../api/auth';
import authStorage from '../auth/storage';
import colors from '../config/colors';
import usersApi from '../api/users';

const schema = Yup.object().shape({
  authCode: Yup.number().required().min(4).label('Authentication code'),
  email: Yup.string().email().required().label('Email'),
  name: Yup.string().required().label('Name'),
});

export type RegistrationInfo = Yup.InferType<typeof schema>;

export default ({ navigation }: ScreenProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useUser();
  const authCodeHandler = useAuthCode();
  const loginApi = useApi(authApi.login);
  const registerApi = useApi(usersApi.register);

  const validateEmail = (): Promise<boolean> =>
    schema.isValid({ email, code: 1000, name: 'Test Name' });

  const requestAuthCode = async () => authCodeHandler.requestAuthCode(await validateEmail(), email);

  const handleSubmit = async ({ authCode, email, name }: RegistrationInfo) => {
    const result = await registerApi.request({ authCode, email, name });

    if (!result.ok)
      return setError((result?.data as DataError)?.error || 'An unexpected error occurred.');

    const { data: authToken } = await loginApi.request(email, authCode);
    await authStorage.storeToken(authToken as string);
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (user) {
    navigation.goBack();
    return null;
  }

  return (
    <>
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/icon.png')} />
            <Form
              initialValues={{ name: '', email: '', password: '' }}
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
                placeholder="Email"
                textContentType="emailAddress"
                value={email}
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="code-braces"
                keyboardType="numeric"
                inputMode="numeric"
                name="code"
                placeholder="Auth Code"
              />
              <SubmitButton title="Register" />
              <PressableText onPress={requestAuthCode} style={styles.text}>
                {authCodeHandler.isRequestingAuthCode ? 'Requesting...' : 'Request Auth Code'}
              </PressableText>
            </Form>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
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
