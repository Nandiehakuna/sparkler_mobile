import { StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default () => {
  const toast = useToast();

  const show = (message: string, type: 'success' | 'error') => {
    const isSuccess = type === 'success';

    toast.show(message, {
      type,
      placement: 'top',
      duration: 5_000,
      animationType: isSuccess ? 'slide-in' : 'zoom-in',
      style: isSuccess ? styles.success : styles.error,
      textStyle: styles.text,
    });
  };

  return { ...toast, show };
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#F44336',
    borderLeftColor: '#E53935',
  },
  success: {
    backgroundColor: '#4CAF50',
    borderLeftColor: '#45A049',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
