import { useEffect, useState } from 'react';

import { getHashtags } from '../utils/funcs';
import { PROJECT_VERB } from './useProjects';
import { SparkleActivity } from '../utils/types';
import service from '../api/hashtags';

type HashtagsToCountMap = {
  [key: string]: number;
};

const useHashtags = () => {
  const [hashtags, setHashtags] = useState<HashtagsToCountMap>({});
  const [verifiedHashtags, setVerifiedHashtags] = useState<HashtagsToCountMap>({});
  const [isLoading, setIsLoading] = useState(false);
  const [sparklesWithHashtags, setSparklesWithHashtags] = useState<SparkleActivity[]>([]);

  useEffect(() => {
    async function initHashtags() {
      setIsLoading(true);
      const hashtags = await getAllHashtags();
      setIsLoading(false);

      setHashtags(parseHashtagsFromSparkles(hashtags));
    }

    async function initVerifiedHashtags() {
      setIsLoading(true);
      setVerifiedHashtags(parseHashtagsFromSparkles(await getVerifiedHashtags()));
      setIsLoading(false);
    }

    initHashtags();
    initVerifiedHashtags();
  }, []);

  async function getVerifiedHashtags() {
    const { ok, data } = await service.getVerifiedHashtags();

    if (ok) return data as unknown as SparkleActivity[];
  }

  async function getAllHashtags(): Promise<SparkleActivity[]> {
    const { ok, data } = await service.getAllHashtags();

    const sparkles = data as unknown as SparkleActivity[];
    if (ok) setSparklesWithHashtags(sparkles);

    return ok ? sparkles : [];
  }

  function parseHashtagsFromSparkles(sparklesWithHashtags: SparkleActivity[]): HashtagsToCountMap {
    let hashtags: HashtagsToCountMap = {};

    sparklesWithHashtags.forEach((sparkle) => {
      const isAProject = sparkle.verb === PROJECT_VERB;
      const sparkleHashtags: string[] = isAProject
        ? ['project']
        : getHashtags(sparkle.object.data.text);

      sparkleHashtags.forEach((hashtag) => {
        hashtags[hashtag] = hashtag in hashtags ? hashtags[hashtag] + 1 : 1;
      });
    });

    return hashtags;
  }

  const getSparklesOfHashtag = (hashtag: string): SparkleActivity[] => {
    return sparklesWithHashtags
      .filter((sparkle) => {
        if (sparkle.verb === 'project') return true;

        return sparkle.object.data.text.toLowerCase().includes(`#${hashtag.toLowerCase()}`);
      })
      .sort((a, b) => (b.actor.data.verified ? 1 : 0) - (a.actor.data.verified ? 1 : 0));
  };

  return {
    verifiedHashtags,
    sparklesWithHashtags,
    hashtags,
    isLoading,
    getSparklesOfHashtag,
  };
};

export default useHashtags;
