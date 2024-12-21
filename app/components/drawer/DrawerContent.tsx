import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { getActorFromUser } from '../../utils/funcs';
import { routes } from '../../navigation';
import { useNavigation, useProfileUser, useUser } from '../../hooks';
import DrawerItemList from './DrawerItemList';
import HeaderLeftUserIcon from '../header/HeaderLeftUserIcon';
import Text from '../Text';
import VerifiedIcon from '../VerifiedIcon';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useUser();
  const { setProfileUser } = useProfileUser();
  const navigation = useNavigation();

  const viewFollowers = () => {
    if (user) {
      setProfileUser(getActorFromUser(user));
      navigation.navigate(routes.FOLLOWERS);
    }
  };

  const viewFollowing = () => {
    if (user) {
      setProfileUser(getActorFromUser(user));
      navigation.navigate(routes.FOLLOWING);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <View>
          <HeaderLeftUserIcon
            onPress={() => navigation.navigate(routes.PROFILE)}
            size={45}
          />
        </View>
        <View style={styles.nameContainer}>
          <View style={styles.nameIconContainer}>
            <Text style={styles.name}>{user?.name || 'Unknown'}</Text>
            {user?.verified && <VerifiedIcon style={styles.verifiedIcon} />}
          </View>
          <Text style={styles.username}>@{user?.username || 'unknown'}</Text>
        </View>

        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={viewFollowing}>
            <Text style={styles.statContainer}>
              <Text style={styles.stat}>
                {Object.keys(user?.followingId || {}).length}{' '}
              </Text>
              Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={viewFollowers}>
            <Text>
              <Text style={styles.stat}>
                {Object.keys(user?.followersId || {}).length}{' '}
              </Text>
              Followers
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: 20,
  },
  name: {
    fontWeight: '800',
    fontSize: 20,
    marginTop: 15,
  },
  nameContainer: {
    marginBottom: 10,
  },
  nameIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    fontWeight: 'bold',
  },
  statContainer: {
    marginRight: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  userInfoSection: {
    paddingLeft: 10,
    marginBottom: 20,
  },
  username: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 14,
  },
  verifiedIcon: {
    marginLeft: 5,
    marginTop: 2,
  },
});

export default DrawerContent;
