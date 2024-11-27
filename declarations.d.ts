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
    options?: object;
    feedGroup?: string;
    userId?: string;
    notify?: boolean;
    Activity?: (props: { activity: T }) => JSX.Element;
    noPagination?: boolean;
    noScrollToTop?: boolean;
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
