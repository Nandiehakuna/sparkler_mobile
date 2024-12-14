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

  interface FlatFeedProps<T = any> {
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
  }

  export function FlatFeed<T = any>(props: FlatFeedProps<T>): JSX.Element;

  interface NotificationFeedProps {
    feedGroup?: string;
    userId?: string;
    options?: object;
    children?: ReactNode;
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
}
