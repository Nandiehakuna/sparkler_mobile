import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { ActivityIndicator } from "../components";
import { routes } from "../navigation";
import { ScreenProps } from "../utils/types";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms/index";
import { useUser } from "../hooks";
import authApi from "../api/auth";
import authStorage from "../auth/storage";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }: ScreenProps) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    const { data, ok } = await authApi.login(email, password);
    setLoading(false);
    if (!ok) return setLoginFailed(true);
    setLoginFailed(false);
    await authStorage.storeToken(data as string);
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  // if (user) {
  //   navigation.navigate(routes.HOME_NAVIGATOR);
  //   return null;
  // }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator />}
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 15,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
