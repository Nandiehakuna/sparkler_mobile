import { useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image as RNImage,
  FlatList,
  PanResponder,
  Animated,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { ScreenProps } from '../utils/types';
import colors from '../config/colors';

export default function ViewImageScreen({ navigation, route }: ScreenProps) {
  const { images } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];

  // Use Animated.Value for smoother transitions when panning
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
          }
        } else if (gestureState.dx < -100) {
          if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
          }
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  // Use this function to reset pan animation each time the image changes
  const resetPan = useCallback(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [pan]);

  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" color={colors.white} size={35} />
        </TouchableOpacity>
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.imageContainer,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
      >
        <RNImage
          source={{ uri: currentImage }}
          style={styles.image}
          onLoadEnd={resetPan}
        />
      </Animated.View>

      {images.length > 1 && (
        <View style={styles.imageRow}>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrentImageIndex(index);
                  resetPan();
                }}
              >
                <View
                  style={[
                    styles.smallImageContainer,
                    index === currentImageIndex && styles.selectedImage,
                  ]}
                >
                  <RNImage source={{ uri: item }} style={styles.smallImage} />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 40,
    left: 30,
    zIndex: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageRow: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  smallImageContainer: {
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  smallImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: colors.white,
  },
});
