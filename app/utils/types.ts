import { StackNavigationProp } from '@react-navigation/stack';

type Common = {
  created_at: string;
  id: string;
  updated_at: string;
};

export interface QuoteActivity extends SparkleActivity {
  quoted_activity: SparkleActivity;
}

export interface ActivityActor extends Common {
  data: {
    id: string;
    bio?: string;
    email: string;
    name: string;
    username: string;
    profileImage?: string;
    coverImage?: string;
    verified?: boolean;
    youtube?: string;
    linkedIn?: string;
    isAdmin?: boolean;
    instagram?: string;
    customLink?: string;
  };
}

export interface ActivityObject extends Common {
  collection: string;
  data: { text: string };
  foreign_id: string;
}

export interface Quote extends Common {
  activity_id: string;
  children_counts: ChildrenCounts;
  data: { text: string };
  kind: 'quote';
  latest_children: object;
  parent: string;
  user: ActivityActor;
  user_id: string;
}

type ChildrenCounts = {
  like?: number;
  resparkle?: number;
  comment?: number;
  reply?: number;
};

export interface Reaction extends Common {
  activity_id: string;
  children_counts: ChildrenCounts;
  data: { id: string; text: string };
  kind: string;
  latest_children: {
    like?: {
      activity_id: string;
      children_counts: ChildrenCounts;
      created_at: string;
      data: {};
      id: string;
      kind: 'like';
      latest_children: {};
      parent: string;
      updated_at: string;
      user: ActivityActor;
      user_id: string;
    }[];
  };
  own_children?: {
    like?: Like[];
    bookmark?: Like[];
    comment?: Comment[];
    resparkle?: Resparkle[];
    quote?: Quote[];
  };
  parent: string;
  user: ActivityActor;
  user_id: string;
}

export interface Reply extends Reaction {
  kind: 'reply';
}

export interface Comment extends Reaction {
  kind: 'comment';
  own_children?: {
    like?: Like[];
    bookmark?: Like[];
    reply?: Reply[];
    resparkle?: Resparkle[];
    quote?: Quote[];
  };
}

interface Like extends Reaction {
  kind: 'like';
}

interface Bookmark extends Reaction {
  kind: 'bookmark';
}

interface Resparkle extends Reaction {
  kind: 'resparkle';
}

export type Video = { mimeType: 'video/mp4'; name: string; url: string };

export type SparkleLatestReactions = {
  like?: Like[];
  bookmark?: Bookmark[];
  comment?: Comment[];
  resparkle?: Resparkle[];
  quote?: Quote[];
};

export type SparkleActivity = {
  id: string;
  actor: ActivityActor;
  object: ActivityObject;
  attachments?: {
    files?: Video[];
    images?: string[];
  };
  time: string;
  latest_reactions?: SparkleLatestReactions;
  own_reactions?: {
    bookmark?: Bookmark[];
    comment?: Comment[];
    like?: Like[];
    quote?: Quote[];
    resparkle?: Resparkle[];
  };
  quoted_activity?: SparkleActivity;
  reaction_counts?: {
    bookmark?: number;
    comment?: number;
    like?: number;
    resparkle?: number;
    quote?: number;
  };
  target: string;
  parent: string;
  verb: string;
};

export type ScreenProps = {
  navigation: StackNavigationProp<any>;
  route: { params: any | undefined };
};

export type FollowingsResponse = {
  duration: string;
  results: {
    followers: {
      count: number;
      feed: string;
    };
    following: {
      count: number;
      feed: string;
    };
  };
};

export type FollowersResult = {
  created_at: string;
  updated_at: string;
  feed_id: 'timeline:';
  target_id: 'user:';
}[];

export type FollowingResult = {
  created_at: string;
  updated_at: string;
  feed_id: 'timeline:';
  target_id: 'user:';
}[];
