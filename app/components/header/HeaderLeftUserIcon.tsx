import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useUser } from '../../hooks';
import Image from '../Image';
import colors from '../../config/colors';

interface Props {
  onPress: () => void;
  size?: number;
}

const HeaderLeftUserIcon = ({ onPress, size = 24 }: Props) => {
  const { user } = useUser();

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.headerLeftContainer}>
        {user?.profileImage ? (
          <Image
            style={{ width: size, height: size, borderRadius: size * 0.5 }}
            uri={user.profileImage}
          />
        ) : (
          <View style={styles.iconContainer}>
            <FontAwesome
              name="user-circle-o"
              size={size}
              color={colors.medium}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 10,
  },
  iconContainer: {
    marginLeft: 3,
  },
});

export default HeaderLeftUserIcon;
