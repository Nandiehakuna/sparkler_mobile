declare module "expo-activity-feed" {
  import { ReactNode } from "react";

  interface StreamAppProps {
    apiKey: string;
    appId: string;
    token: string;
    options?: object;
    children?: ReactNode;
  }

  export function StreamApp(props: StreamAppProps): JSX.Element;

  type FlatFeedOptions = {
    withReactionCounts?: boolean;
    withRecentReactions?: boolean;
    withOwnReactions?: boolean;
    reactions?: shape;
    limit?: number;
    offset?: number;
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    ranking?: string;
    mark_seen?: union;
    mark_read?: union;
    refresh?: boolean;
  };

  interface FlatFeedProps<T = any> {
    options?: FlatFeedOptions;
    feedGroup?: string;
    userId?: string; // updated userId type
    options: {
      withReactionCounts?: boolean;
      withRecentReactions?: boolean;
      withOwnReactions?: boolean;
      reactions?: object;
      limit?: number;
      offset?: number;
      id_lt?: string;
      id_lte?: string;
      id_gt?: string;
      id_gte?: string;
      ranking?: string;
      mark_seen?: any; // can be union type as per your instructions
      mark_read?: any; // can be union type as per your instructions
      refresh?: boolean;
    };
    Activity?: (props: { activity: T }) => JSX.Element;
    notify?: boolean; // added notify property
    Footer?: ReactNode; // added Footer property
    LoadingIndicator?: () => JSX.Element;
    doFeedRequest?: (
      client: any,
      feedGroup: string,
      userId: string,
      options: object
    ) => void;
    doReactionAddRequest?: (
      kind: string,
      activity: object,
      data: object,
      options: object
    ) => void;
    doReactionDeleteRequest?: (id: string) => void;
    doChildReactionAddRequest?: (
      kind: string,
      activity: object,
      data: object,
      options: object
    ) => void;
    doChildReactionDeleteRequest?: (id: string) => void;
    doReactionsFilterRequest?: (options: object) => Promise<any>;
    noPagination?: boolean;
    analyticsLocation?: string;
    onRefresh?: () => void;
    styles?: object;
    navigation?: object;
    flatListProps?: object; // added flatListProps
    setListRef?: (ref: any) => void; // added setListRef
    children?: ReactNode;
    Notifier?: () => JSX.Element;
  }

  export function FlatFeed<T = any>(props: FlatFeedProps<T>): JSX.Element;

  interface NotificationFeedProps {
    feedGroup?: string;
    userId?: string;
    options?: {
      withReactionCounts?: boolean;
      withRecentReactions?: boolean;
      withOwnReactions?: boolean;
      reactions?: shape;
      limit?: number;
      offset?: number;
      id_lt?: string;
      id_lte?: string;
      id_gt?: string;
      id_gte?: string;
      ranking?: string;
      mark_seen?: union;
      mark_read?: union;
      refresh?: boolean;
    };
    children?: ReactNode;
    Notifier?: () => JSX.Element;
    notify?: boolean;
  }

  export function NotificationFeed(props: NotificationFeedProps): JSX.Element;

  interface FeedContextValue {
    client: any;
    user: any;
    getActivities: (options: object) => Promise<any>;
    getActivityDetail: (activityId: string) => Promise<any>;
    [key: string]: any;
  }

  export const FeedContext: React.Context<FeedContextValue>;

  interface StatusUpdateFormProps {
    feedGroup?: string;
    userId?: string;
    placeholder?: string;
    children?: ReactNode;
    onSuccess?: (activity: any) => void;
    [key: string]: any;
  }

  export function StatusUpdateForm(props: StatusUpdateFormProps): JSX.Element;

  interface ActivityProps<T = any> {
    activity: T;
    feedGroup?: string;
    userId?: string;
    onToggleReaction?: (kind: string, activity: T) => void;
    [key: string]: any;
  }

  export function Activity<T = any>(props: ActivityProps<T>): JSX.Element;

  export const LikeButton: React.FC<{ activity: any }>;

  export const CommentList: React.FC<{ activityId: string }>;

  export const CommentField: React.FC<{ activity: any }>;

  interface FollowButtonProps {
    followed: boolean;
    clicked?: () => void;
    styles?: object;
  }

  export const FollowButton: React.FC<FollowButtonProps>;

  interface AvatarProps {
    size: number;
    editButton: boolean;
    noShadow: boolean;
    notRound: boolean;
    onUploadButtonPress: () => void;
    styles: object;
    source: string;
  }

  export const Avatar: React.FC<AvatarProps>;

  interface IconBadgeProps {
    feedGroup?: string;
    userId?: string;
    styles?: object;
    showNumber?: number;
    hidden?: bool;
    mainElement?: () => JSX.Element;
  }

  export const IconBadge: React.FC<IconBadgeProps>;
}
