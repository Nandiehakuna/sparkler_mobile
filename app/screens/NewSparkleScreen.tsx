import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";

import { ErrorMessage } from "../components/forms";
import { Screen } from "../components";
import { ScreenProps } from "../utils/types";
import { UserIcon } from "../components/icons";
import { useUser } from "../hooks";
import colors from "../config/colors";
import Header from "../components/screen/Header";
import sparklesApi from "../api/sparkles";

export default ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();

  const buttonDisabled = !text.length || loading;

  const handleSparkle = async () => {
    if (error) setError("");

    setLoading(true);
    const res = await sparklesApi.createSparkle({ images: [], text });
    setLoading(false);

    if (res.ok) {
      //TODO: Toast for a sparkle success
      setText("");
      navigation.goBack();
    } else {
      setError(res.problem);
    }
  };

  return (
    <Screen style={styles.container}>
      <Header
        buttonTitle="Sparkle"
        disable={buttonDisabled}
        loading={loading}
        onButtonPress={handleSparkle}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.image} />
          ) : (
            <View style={styles.userIcon}>
              <UserIcon size={styles.image.height} color={colors.white} />
            </View>
          )}

          <View>
            <TextInput
              autoFocus
              placeholder="What’s sparkling?"
              value={text}
              onChangeText={setText}
            />
            <ErrorMessage error={error} visible={Boolean(error.length)} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    borderRadius: 20,
    height: 40,
    marginRight: 5,
    width: 40,
  },
  inputContainer: {
    flexDirection: "row",
  },
  scrollView: {
    padding: 16,
  },
  userIcon: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 20,
    justifyContent: "center",
    marginRight: 8,
  },
});
