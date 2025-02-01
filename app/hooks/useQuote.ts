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
        message: `${user?.name} quoted your sparkle`,
        targetUsersId: [actorId],
      });

    return response;
  };

  return { handleQuote };
};
