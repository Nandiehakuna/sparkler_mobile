import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { routes } from "../../navigation";
import { useNavigation } from "../../hooks";
import colors from "../../config/colors";
import Image from "../Image";

interface Props {
  images: string[];
}

export default ({ images }: Props) => {
  const navigation = useNavigation();

  if (!images.length) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.VIEW_IMAGE, { images })}
    >
      <Image uri={images[0]} style={styles.image} />
      {images.length > 1 && (
        <Text style={styles.text}>+{images.length - 1} more images</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    borderRadius: 20,
    height: 200,
    marginTop: 3,
    objectFit: "cover",
    width: "100%",
  },
  text: {
    color: colors.medium,
    fontSize: 12,
    marginBottom: 1,
    marginRight: 5,
    textAlign: "right",
  },
});
