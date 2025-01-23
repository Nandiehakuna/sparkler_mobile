import { StyleSheet } from 'react-native';
import { ToastOptions, useToast } from 'react-native-toast-notifications';

export default () => {
  const toast = useToast();

  const show = (
    message: string | JSX.Element,
    type: 'success' | 'error',
    options?: ToastOptions | undefined
  ) => {
    const isSuccess = type === 'success';

    const defaultOption: ToastOptions = {
      type,
      placement: 'top',
      duration: 5_000,
      animationType: isSuccess ? 'slide-in' : 'zoom-in',
      style: isSuccess ? styles.success : styles.error,
      textStyle: styles.text,
    };

    toast.show(message, { ...defaultOption, ...(options || {}) });
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
