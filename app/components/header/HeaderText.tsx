import { StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  text: string;
  route: string;
}

export default ({ route, text }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(route)}>
      <Text style={styles.text} isBold>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
  },
  text: {
    color: colors.blue,
    fontSize: 17,
    letterSpacing: 0.2,
  },
});
