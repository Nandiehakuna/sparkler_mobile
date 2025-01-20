import { ImageBackground, StyleSheet, View } from 'react-native';

import { Button, Text } from '../components';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useUser } from '../hooks';
import colors from '../config/colors';

export default ({ navigation }: ScreenProps) => {
  const { user } = useUser();

  if (user) {
    navigation.goBack();
    return null;
  }

  return (
    <ImageBackground
      blurRadius={10}
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo} isBold>
          Sparkler
        </Text>
        <Text style={styles.tagline}>Sparklers are waiting to connect</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button color="primary" onPress={() => navigation.navigate(routes.LOGIN)} title="Login" />
        <Button
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
          title="Register"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    bottom: 50,
    padding: 20,
    width: '100%',
  },
  logo: {
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 200,
  },
  tagline: {
    color: colors.white,
    fontSize: 20,
    paddingVertical: 20,
  },
});
