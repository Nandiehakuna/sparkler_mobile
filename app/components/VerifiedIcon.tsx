import { StyleSheet, Image } from 'react-native';

interface Props {
  style?: object;
}

export default ({ style = {} }: Props) => {
  return (
    <Image
      source={require('../assets/verified.png')}
      style={[styles.verifiedIcon, style]}
    />
  );
};

const styles = StyleSheet.create({
  verifiedIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});
