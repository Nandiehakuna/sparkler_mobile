import { ImageProps } from "react-native";
import { Image } from "react-native-expo-image-cache";

interface Props extends ImageProps {
  uri: string;
}

export default ({ uri, ...otherProps }: Props) => {
  return (
    <Image uri={uri} preview={{ uri: uri }} tint="light" {...otherProps} />
  );
};
