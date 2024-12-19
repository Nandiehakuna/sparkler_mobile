import AntDesign from '@expo/vector-icons/AntDesign';
import { Activity } from 'getstream';

import { ResparkleIcon } from '../icons';
import { routes } from '../../navigation';
import { SparkleActivity } from '../../utils/types';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useResparkle } from '../../hooks';
import Modal from '../Modal';
import ModalContent from './MediaQuery';

interface Props {
  activity: SparkleActivity | Activity;
  hasResparkled: boolean;
  visible: boolean;
  onClose: () => void;
  ontoggleResparkle: (value: boolean) => void;
}

export default (props: Props) => {
  const handler = useResparkle();
  const navigation = useNavigation();

  const { activity, hasResparkled, onClose, ontoggleResparkle, visible } =
    props;

  const toggleResparkle = async () => {
    onClose();
    ontoggleResparkle(!hasResparkled);

    const res = await handler.toggleResparkle(activity, hasResparkled);
    if (!res?.ok) {
      ontoggleResparkle(!hasResparkled);
      console.log('error resparkling');
    }
  };

  const handleQuoteCreation = () => {
    onClose();
    //TODO: have a single module to navigate to a particular screen with a DEFINED data to be passed
    navigation.navigate(routes.QUOTE, activity);
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalContent
        Icon={<ResparkleIcon resparkled={hasResparkled} size={18} />}
        label={hasResparkled ? 'Undo Resparkle' : 'Resparkle'}
        onPress={toggleResparkle}
      />
      <View style={styles.spacer} />
      <ModalContent
        Icon={<AntDesign name="edit" size={18} />}
        label="Quote Sparkle"
        onPress={handleQuoteCreation}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 3,
    width: '100%',
  },
});
