import { StyleSheet, View } from 'react-native';

import Text from '../Text';

interface Props {
  label?: string;
}

export default ({ label = 'following' }: Props) => {
  return (
    <View style={styles.container}>
      <Text>
        No {label} {label === 'following' ? ". Error fetching user's following" : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 50,
  },
});
