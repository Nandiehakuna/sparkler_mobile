import { StyleSheet, Image } from 'react-native';

interface Props {
  style?: object;
  verfied?: boolean;
}

export default ({ style = {}, verfied }: Props) => {
  if (verfied)
    return (
      <Image
        source={require('../assets/verified.png')}
        style={[styles.verifiedIcon, style]}
      />
    );

  return null;
};

const styles = StyleSheet.create({
  verifiedIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});
