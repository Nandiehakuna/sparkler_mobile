import { useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';

import { useTheme } from '../hooks';

interface Props {
  onRefresh: () => Promise<any>;
}

export default ({ onRefresh }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      tintColor={theme.colors.text}
      colors={[theme.colors.primary]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
