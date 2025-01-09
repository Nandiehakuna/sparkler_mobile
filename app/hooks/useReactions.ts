import { Reaction } from '../utils/types';
import { Response } from '../api/client';
import sparklesApi from '../api/sparkles';

export default () => {
  const getSparklesOfReactions = (reactions: Reaction[]): Promise<Response> => {
    const sparklesId: string[] = [];

    reactions.forEach((reaction) => sparklesId.push(reaction.activity_id));

    return sparklesApi.getSparkles(sparklesId);
  };

  return { getSparklesOfReactions };
};
