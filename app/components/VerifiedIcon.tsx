import { StyleSheet, Image } from 'react-native';

interface Props {
  style?: object;
  isAdmin?: boolean;
  verfied?: boolean;
}

export default ({ isAdmin, style = {}, verfied }: Props) => {
  if (isAdmin)
    return <Image source={require('../assets/admin.png')} style={[styles.verifiedIcon, style]} />;

  if (verfied)
    return (
      <Image source={require('../assets/verified.png')} style={[styles.verifiedIcon, style]} />
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
