import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { ActivityIndicator, FloatingButton } from '../components';
import { ProjectIcon } from '../components/project';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { Sparkle, SparkleIcon } from '../components/sparkle';
import { useHashtags } from '../hooks';

export default ({ navigation }: ScreenProps) => {
  const { getSparklesOfHashtag, isLoading } = useHashtags();

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <FlatList
          data={getSparklesOfHashtag('project')}
          keyExtractor={(sparkle) => sparkle.id}
          renderItem={({ item: sparkle }) => <Sparkle activity={sparkle as unknown as Activity} />}
        />

        <FloatingButton
          Icon={<SparkleIcon Icon={<ProjectIcon />} />}
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
