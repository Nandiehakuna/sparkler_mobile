import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NotificationActivity } from 'getstream';
import Icon from '@expo/vector-icons/FontAwesome6';

import { ActivityActor } from '../../utils/types';
import { getUserFromActor } from '../../utils/funcs';
import colors from '../../config/colors';
import Notification from './Notification';
import Text from '../Text';
import UserCard from '../UserCard';

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const [showFollowers, setShowFollowers] = useState(false);

  const { activities } = activityGroup;

  const getFollowers = (): ActivityActor[] =>
    activities.map((a) => a.actor as unknown as ActivityActor);

  const closeModal = () => setShowFollowers(false);

  const ModalContent = (
    <Modal animationType="slide" visible={showFollowers}>
      <View style={styles.followersContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>New Followers</Text>

          <TouchableWithoutFeedback onPress={closeModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableWithoutFeedback>
        </View>

        <FlatList
          data={getFollowers()}
          keyExtractor={(follower) => follower.id}
          renderItem={({ item }) => (
            <UserCard user={getUserFromActor(item)} onPress={closeModal} />
          )}
        />
      </View>
    </Modal>
  );

  return (
    <Notification
      Icon={<Icon name="user-plus" size={24} color={colors.blue} />}
      activityGroup={activityGroup}
      action="followed you"
      Other={ModalContent}
      onPress={() => setShowFollowers(true)}
    />
  );
};

const styles = StyleSheet.create({
  closeText: {
    color: colors.blue,
  },
  followersContainer: {
    padding: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
  },
});
