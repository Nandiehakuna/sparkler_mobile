import { emptyUser, User } from '../contexts/UsersContext';

import { ActivityActor } from './types';

export const getActorFromUser = ({
  _id,
  timestamp,
  ...rest
}: User): ActivityActor => {
  const time = timestamp
    ? new Date(timestamp).toISOString()
    : new Date().toISOString();

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

export function generateSparkleLink(
  actorUsername: string,
  sparkleActivityId: string,
) {
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
