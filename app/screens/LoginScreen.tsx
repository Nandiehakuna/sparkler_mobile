import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ActivityIndicator, Screen } from '../components';
import { ScreenProps } from '../utils/types';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms/index';
import { Response } from '../api/client';
import { useUser } from '../hooks';
import authApi from '../api/auth';
import authStorage from '../auth/storage';
import colors from '../config/colors';

const schema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

type LoginInfo = Yup.InferType<typeof schema>;

export default function LoginScreen({ navigation }: ScreenProps) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<Response> => {
    setLoading(true);
    const res = await authApi.login(email, password);
    setLoginFailed(!res.ok);
    setLoading(false);

    return res;
  };

  const handleSubmit = async (
    { email, password }: LoginInfo,
    { resetForm }: FormikHelpers<object>,
  ) => {
    const { data, ok } = await loginUser(email, password);
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
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <ErrorMessage
              error="Invalid email and/or password."
              visible={loginFailed}
            />
            <FormField
              icon="email"
              name="email"
              placeholder="Email"
              autoCapitalize="none"
              autoComplete="off"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <FormField
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Login" />
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
});
