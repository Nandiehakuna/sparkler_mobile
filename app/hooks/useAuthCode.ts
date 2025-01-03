import { useState } from 'react';

import authApi from '../api/auth';

export default () => {
  const [error, setError] = useState('');
  const [isRequestingAuthCode, setRequestingAuthCode] = useState(false);

  const requestAuthCode = async (isValidEmail: boolean, email: string) => {
    if (error) setError('');

    if (isValidEmail) {
      setRequestingAuthCode(true);
      const { ok } = await authApi.getAuthCode(email);
      setRequestingAuthCode(false);

      if (ok) {
        // TODO: toast to inform code was sent
      } else {
        // TODO: toast to show code wasn't sent and something failed
      }
    } else setError('Enter a valid email address to get the code');
  };

  return { requestAuthCode, isRequestingAuthCode };
};
