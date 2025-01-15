import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { routes } from '../../navigation';
import { useNavigation } from '../../hooks';
import colors from '../../config/colors';
import Image from '../Image';

interface Props {
  images: string[];
}

export default ({ images }: Props) => {
  const navigation = useNavigation();

  if (!images.length) return null;

  const getThridImageHeight = (): number => styles.image.height * 2 + 2;

  const renderImages = () => {
    if (images.length === 1) {
      return <Image uri={images[0]} style={styles.singleImage} />;
    } else if (images.length === 2) {
      return (
        <View style={styles.twoImages}>
          <Image uri={images[0]} style={[styles.image, { marginRight: 2 }]} />
          <Image uri={images[1]} style={[styles.image, { marginLeft: 2 }]} />
        </View>
      );
    } else if (images.length === 3) {
      return (
        <View style={styles.threeImages}>
          <View style={styles.threeTopImages}>
            <Image uri={images[0]} style={[styles.image, { marginRight: 2 }]} />
            <Image uri={images[1]} style={[styles.image, { marginLeft: 2 }]} />
          </View>
          <View style={styles.threeBottomImage}>
            <Image
              uri={images[2]}
              style={[
                styles.image,
                {
                  height: getThridImageHeight(),
                  width: '100%',
                  marginLeft: 0,
                  marginRight: 0,
                },
              ]}
            />
          </View>
        </View>
      );
    } else if (images.length === 4) {
      return (
        <View style={styles.fourImages}>
          <View style={styles.twoImageRow}>
            <Image uri={images[0]} style={[styles.image, { marginRight: 2 }]} />
            <Image uri={images[1]} style={[styles.image, { marginLeft: 2 }]} />
          </View>
          <View style={styles.twoImageRow}>
            <Image uri={images[2]} style={[styles.image, { marginRight: 2 }]} />
            <Image uri={images[3]} style={[styles.image, { marginLeft: 2 }]} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.fourPlusImages}>
          <View style={styles.twoImageRow}>
            <Image uri={images[0]} style={[styles.image, { marginRight: 2 }]} />
            <Image uri={images[1]} style={[styles.image, { marginLeft: 2 }]} />
          </View>
          <View style={styles.twoImageRow}>
            <Image uri={images[2]} style={[styles.image, { marginRight: 2 }]} />
            <Image uri={images[3]} style={[styles.image, { marginLeft: 2 }]} />
          </View>
          <Text style={styles.moreImagesText}>+{images.length - 4} more</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.VIEW_IMAGE, { images })}
    >
      {renderImages()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    marginTop: 7,
  },
  singleImage: {
    borderRadius: 20,
    height: 200,
    objectFit: 'cover',
    width: '100%',
  },
  image: {
    borderRadius: 20,
    height: 150, // Original height for single images in a row
    width: '49%',
    objectFit: 'cover',
  },
  twoImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  threeImages: {
    flexDirection: 'column',
    width: '100%',
  },
  threeTopImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  threeBottomImage: {
    width: '100%',
    marginTop: 2, // Small gap between rows for aesthetics
  },
  twoImageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  fourImages: {
    flexDirection: 'column',
  },
  fourPlusImages: {
    flexDirection: 'column',
  },
  moreImagesText: {
    color: colors.medium,
    fontSize: 12,
    marginBottom: 1,
    marginRight: 5,
    textAlign: 'right',
  },
});
