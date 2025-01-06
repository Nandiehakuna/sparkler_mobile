import { useState } from 'react';

import authApi from '../api/auth';
import useToast from './useToast';

export default () => {
  const [error, setError] = useState('');
  const [isRequestingAuthCode, setRequestingAuthCode] = useState(false);
  const toast = useToast();

  const requestAuthCode = async (isValidEmail: boolean, email: string) => {
    if (error) setError('');

    if (isValidEmail) {
      setRequestingAuthCode(true);
      const { ok } = await authApi.getAuthCode(email);
      setRequestingAuthCode(false);

      ok
        ? toast.show('Check your email for the Auth Code', 'success')
        : toast.show(
            "Code couldn't be sent! Are you sure the email exists?",
            'error',
          );
    } else setError('Enter a valid email address to get the code');
  };

  return { requestAuthCode, isRequestingAuthCode };
};
