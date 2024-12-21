import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { DataError } from '../api/client';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms';
import { ScreenProps } from '../utils/types';
import { useApi, useUser } from '../hooks';
import colors from '../config/colors';
import authApi from '../api/auth';
import usersApi from '../api/users';
import authStorage from '../auth/storage';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(4).required().label('Password'),
});

export type RegistrationInfo = Yup.InferType<typeof validationSchema>;

export default ({ navigation }: ScreenProps) => {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const { user, setUser } = useUser();
  const [error, setError] = useState('');

  const handleSubmit = async (userInfo: RegistrationInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data)
        setError((result.data as DataError)?.error || 'Unknown error');
      else {
        setError('An unexpected error occurred.');
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password,
    );
    await authStorage.storeToken(authToken as string);
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (user) {
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/icon.png')} />
        <Form
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={!!error} />
          <FormField
            icon="account"
            placeholder="Name"
            name="name"
            autoComplete="off"
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
          <SubmitButton title="Register" />
        </Form>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 15,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});
