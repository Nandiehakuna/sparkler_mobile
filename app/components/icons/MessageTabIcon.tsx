import { StyleSheet, Text, View } from 'react-native';

import MailIcon from './MailIcon';
import colors from '../../config/colors';
import { useUnreadMessagesCount } from '../../hooks';

interface Props {
  focused: boolean;
  color: string;
  size: number;
}

export default (props: Props) => {
  const { unreadCount: count } = useUnreadMessagesCount();

  return (
    <View style={styles.container}>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
      <MailIcon {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.blue,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
