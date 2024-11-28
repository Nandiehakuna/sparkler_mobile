declare module "react-native-activity-feed" {
  import { Component, Context } from "react";
  import { StreamClient, StreamUser } from "getstream";

  // Context
  export class StreamApp extends Component<{
    apiKey: string;
    appId: string;
    token: string;
  }> {}

  export class Feed extends Component<{
    feedGroup: string;
    userId?: string;
    options?: Record<string, unknown>;
  }> {}

  export const StreamContext: Context<{
    client: StreamClient;
    user: StreamUser;
  }>;

  export const FeedContext: Context<unknown>;
  export const TranslationContext: Context<unknown>;

  export function withTranslationContext<C extends React.Component>(
    component: C
  ): C;

  // Components
  export class FlatFeed extends Component<{
    feedGroup: string;
    userId?: string;
    options?: Record<string, unknown>;
    renderItem?: (item: unknown) => JSX.Element;
    notify?: boolean;
  }> {}

  export class NotificationFeed extends Component {}
  export class SinglePost extends Component {}
  export class Avatar extends Component<{
    source: string | { uri: string };
    size?: number;
    circle?: boolean;
  }> {}
  export class FollowButton extends Component {}
  export class UrlPreview extends Component {}
  export class StatusUpdateForm extends Component {}
  export class UploadImage extends Component {}

  export class UserBar extends Component<{
    username: string;
    avatar: string;
    subtitle: string;
    time: string;
    timestamp: string | number;
    icon: string | number;
    onPressAvatar: () => void;
    follow?: boolean;
    styles?: {
      container?: object;
      avatar?: object;
      username?: object;
      subtitle?: object;
      time?: object;
      icon?: object;
    };
  }> {}

  export class UserCard extends Component {}
  export class ReactionIcon extends Component<{
    kind: string;
    counts?: Record<string, number>;
    own_reactions?: Record<string, unknown>;
    onPress?: () => void;
  }> {}
  export class ReactionToggleIcon extends Component {}
  export class ReactionIconBar extends Component<{
    reactions: Record<string, unknown>;
    onPressReaction?: (reaction: string) => void;
  }> {}
  export class CommentsContainer extends Component {}
  export class Card extends Component {}
  export class ReactionList extends Component {}
  export class SectionHeader extends Component {}
  export class CommentBox extends Component {}
  export class CommentItem extends Component {}
  export class CommentList extends Component {}
  export class LikeList extends Component {}
  export class BackButton extends Component {}
  export class Activity extends Component {}
  export class LikeButton extends Component {}
  export class NewActivitiesNotification extends Component {}
  export class IconBadge extends Component {}

  // Style
  export function updateStyle(...args: unknown[]): unknown;
  export function getStyle(...args: unknown[]): unknown;
  export function buildStylesheet(...args: unknown[]): unknown;

  // Utils
  export function humanizeTimestamp(
    timestamp: string | number,
    language?: string
  ): string;

  export function registerNativeHandlers(handlers: {
    pickImage?: () => Promise<{ uri: string; name?: string }>;
    getPhotos?: () => Promise<Array<{ uri: string }>>;
    share?: (url: string) => Promise<void>;
  }): void;

  export function setAndroidTranslucentStatusBar(enabled: boolean): void;
}
