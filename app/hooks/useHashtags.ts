import { useEffect, useState } from "react";

import { getHashtags } from "../utils/funcs";
import { SparkleActivity } from "../utils/types";
import service from "../services/hashtags";

type Hashtags = {
  [key: string]: number;
};
const useHashtags = () => {
  const [hashtags, setHashtags] = useState<Hashtags>({});
  const [verifiedHashtags, setVerifiedHashtags] = useState<Hashtags>({});
  const [isLoading, setIsLoading] = useState(false);
  const [sparklesWithHashtags, setSparklesWithHashtags] = useState<
    SparkleActivity[]
  >([]);

  useEffect(() => {
    async function initHashtags() {
      const hashtags = await getAllHashtags();

      setHashtags(parseHashtagsFromSparkles(hashtags));
    }

    async function initVerifiedHashtags() {
      setVerifiedHashtags(
        parseHashtagsFromSparkles(await getVerifiedHashtags())
      );
    }

    setIsLoading(true);
    initHashtags();
    initVerifiedHashtags();
    setIsLoading(false);
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

  function parseHashtagsFromSparkles(sparklesWithHashtags: SparkleActivity[]) {
    let hashtags: Hashtags = {};

    sparklesWithHashtags.forEach((sparkle) => {
      const text = sparkle.object.data.text;

      getHashtags(text).forEach(async (hashtag) => {
        let count = 0;

        sparklesWithHashtags.forEach((sparkle) => {
          if (sparkle.object.data.text.includes(`#${hashtag}`)) count++;
        });

        return (hashtags[hashtag] = count);
      });
    });

    return hashtags;
  }

  const getSparklesOfHashtag = (hashtag: string): SparkleActivity[] => {
    return sparklesWithHashtags
      .filter((tag) =>
        tag.object.data.text.toLowerCase().includes(`#${hashtag.toLowerCase()}`)
      )
      .sort(
        (a, b) =>
          (b.actor.data.verified ? 1 : 0) - (a.actor.data.verified ? 1 : 0)
      );
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
