import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import Text from '../Text';

interface Props extends TouchableOpacityProps {}

export default ({ ...otherProps }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} {...otherProps}>
        <Text style={styles.text} isBold>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderColor: '#657786',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
