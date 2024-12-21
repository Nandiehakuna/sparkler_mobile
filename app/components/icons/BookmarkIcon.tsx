import { OpaqueColorValue } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default (props: Props) => {
  return <Ionicons name="bookmark-outline" {...props} />;
};
