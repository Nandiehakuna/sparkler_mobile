import { ActivityActor } from './types';
import { emptyUser, User } from '../contexts/UsersContext';
import { HashtagMentionPart } from '../components/sparkle/SparkleText';

export const getActorFromUser = ({ _id, timestamp, ...rest }: User): ActivityActor => {
  const time = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();

  return {
    data: { ...rest, id: _id },
    created_at: time,
    updated_at: time,
    id: _id,
  };
};

export const getUserFromActor = (actor: ActivityActor): User => {
  const { id } = actor.data;

  return { ...emptyUser, ...actor.data, _id: id };
};

export function getFirstWord(sentence: string): string {
  if (!sentence) return '';

  const words = sentence.trim().split(' ');

  return words[0] || '';
}

export function generateSparkleLink(actorUsername: string, sparkleActivityId: string) {
  return `/${actorUsername}/status/${sparkleActivityId}`;
}

export function getHashtags(text: string): string[] {
  const hashtagPattern = /#(\w+)/g;
  let match: RegExpExecArray | null;
  const hashtags = [];

  while ((match = hashtagPattern.exec(text)) !== null) {
    hashtags.push(match[1]);
  }

  return hashtags;
}

export const parseHashtagsAndMentions = (str: string): HashtagMentionPart[] => {
  const parts: HashtagMentionPart[] = [];
  let match;
  let lastIndex = 0;

  const regex = /(^|\s)(#[a-z\d-]+|[@][a-z\d-]+)/gi;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: str.slice(lastIndex, match.index) });
    }

    parts.push({
      text: match[2],
      isMention: match[2].startsWith('@'),
      isHashtag: match[2].startsWith('#'),
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) parts.push({ text: str.slice(lastIndex) });

  return parts;
};
