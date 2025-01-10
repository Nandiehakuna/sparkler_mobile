import { Reaction } from '../utils/types';
import { Response } from '../api/client';
import sparklesApi from '../api/sparkles';

export default () => {
  const getSparklesOfReactions = (reactions: Reaction[]): Promise<Response> => {
    let sparklesId: string[] = [];

    reactions.forEach((reaction) => {
      sparklesId = [reaction.activity_id, ...sparklesId];
    });

    return sparklesApi.getSparkles(sparklesId);
  };

  return { getSparklesOfReactions };
};
