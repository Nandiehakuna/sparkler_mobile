import { Response } from '../api/client';
import api, { NewQuote } from '../api/sparkles';
import expoPushNotificationsApi from '../api/expoPushNotifications';
import useUser from './useUser';

export default () => {
  const { user } = useUser();

  const handleQuote = async (actorId: string, quote: NewQuote): Promise<Response> => {
    const response = await api.quoteSparkle(quote);

    if (user?._id !== actorId)
      expoPushNotificationsApi.send({
        title: `${user?.name} quoted your sparkle`,
        message: quote?.text || '',
        targetUsersId: [actorId],
      });

    return response;
  };

  return { handleQuote };
};
