import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { ScreenProps } from "../utils/types";
import { Text } from "../components";
import { useUser } from "../hooks";
import useAuth from "../auth/useAuth";

export default ({ navigation }: ScreenProps) => {
  const auth = useAuth();
  const { setUser, user } = useUser();

  const handleLogin = async () => {
    try {
      const user = await auth.logIn();
      if (user) setUser(user);
      console.log("sds", user);
    } catch (error) {
      console.log("Couldn't login", error);
    }
  };

  if (user) {
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tagline}>
        Get in to unlock sparkling possibilities!
      </Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
        <AntDesign name="google" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
