import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { ActivityIndicator, AppRefreshControl, FloatingButton } from '../components';
import { ProjectIcon } from '../components/project';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { Sparkle, SparkleIcon } from '../components/sparkle';
import { useHashtags } from '../hooks';
import colors from '../config/colors';

export default ({ navigation }: ScreenProps) => {
  const { initHashtags, getSparklesOfHashtag, isLoading } = useHashtags();

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <FlatList
          data={getSparklesOfHashtag('project')}
          keyExtractor={(sparkle) => sparkle.id}
          renderItem={({ item: sparkle }) => <Sparkle activity={sparkle as unknown as Activity} />}
          refreshControl={<AppRefreshControl onRefresh={initHashtags} />}
        />

        <FloatingButton
          Icon={<SparkleIcon Icon={<ProjectIcon color={colors.white} />} />}
          onPress={() => navigation.navigate(routes.NEW_PROJECT)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
