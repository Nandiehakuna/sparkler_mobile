import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatFeed } from "expo-activity-feed";

import { ActivityActor } from "../utils/types";
import { Sparkle } from "../components";
import { useProfileUserContext } from "../hooks";
import colors from "../config/colors";

export default () => {
  const { profileUser } = useProfileUserContext();
  const [user, setUser] = useState<ActivityActor | undefined>(profileUser);

  useEffect(() => {
    if (user?.id !== profileUser?.id) setUser(profileUser);
  }, [profileUser?.id]);

  if (!profileUser) return null;

  return (
    <View style={styles.container}>
      <FlatFeed
        key={profileUser.id}
        Activity={(props) => <Sparkle {...props} />}
        feedGroup="user"
        LoadingIndicator={() => <ActivityIndicator color={colors.primary} />}
        notify
        userId={profileUser.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
