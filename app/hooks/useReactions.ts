import { Comment, Reaction, SparkleActivity } from '../utils/types';
import { Response } from '../api/client';
import reactionsApi from '../api/reactions';
import sparklesApi from '../api/sparkles';

export default () => {
  async function getSparkles(ids: string[]) {
    if (!ids.length) return [];

    const res = await sparklesApi.getSparkles(ids);

    return res.ok ? (res.data as SparkleActivity[]) : [];
  }

  async function getComments(ids: string[]) {
    if (!ids.length) return [];

    const res = await reactionsApi.getByIds(ids);

    return res.ok ? (res.data as Comment[]) : [];
  }

  const getReactedActivities = async (
    reactions: Reaction[]
  ): Promise<{
    data: Array<Comment | SparkleActivity>;
    ok: boolean;
    problem: string;
  }> => {
    const sparklesId: string[] = [];
    const commentsId: string[] = [];

    reactions.forEach(({ activity_id, parent }) => {
      parent ? commentsId.push(parent) : sparklesId.push(activity_id);
    });

    const sparkles = await getSparkles(sparklesId);
    const comments = await getComments(commentsId);

    return {
      data: [...sparkles, ...comments] as Array<Comment | SparkleActivity>,
      ok: true,
      problem: '',
    };
  };

  return { getReactedActivities };
};
