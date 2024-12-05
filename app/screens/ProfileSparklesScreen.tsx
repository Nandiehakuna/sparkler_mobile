import React from "react";
import { FlatFeed } from "expo-activity-feed";

import { ActivityIndicator, Sparkle } from "../components";
import { useProfileUser } from "../hooks";

export default () => {
  const { profileUser } = useProfileUser();

  if (!profileUser) return <ActivityIndicator />;

  return (
    <FlatFeed
      key={profileUser.id}
      Activity={(props) => <Sparkle {...props} />}
      feedGroup="user"
      LoadingIndicator={() => <ActivityIndicator />}
      notify
      userId={profileUser.id}
    />
  );
};
