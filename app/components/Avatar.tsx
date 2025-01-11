import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '../hooks';
import Image from './Image';

interface Props {
  image: string | undefined;
  size?: number;
  style?: { width?: number; height?: number; borderWidth?: number };
  onPress?: () => void;
}

export default ({ image, size = 24, onPress, style = {} }: Props) => {
  const { theme } = useTheme();

  const imageSize = style.height || style.width || size;

  return (
    <View>
      {/* Don't remove this View it ensures we visit the profile only when the image is clicked and not around it */}
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {image ? (
          <Image
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize * 0.5,
            }}
            uri={image}
          />
        ) : (
          <View style={styles.iconContainer}>
            <FontAwesome name="user-circle-o" size={imageSize} color={theme.colors.text} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  iconContainer: {},
});
