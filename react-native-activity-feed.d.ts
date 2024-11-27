declare module "react-native-activity-feed" {
  import { Component } from "react";
  import { StreamClient, StreamUser } from "getstream";
  // Context
  export class StreamApp extends Component {}
  export class Feed extends Component {}
  export const StreamContext: React.Context<{
    client: StreamClient;
    user: StreamUser;
  }>;
  export const FeedContext: React.Context<unknown>;
  export const TranslationContext: React.Context<unknown>;

  export function withTranslationContext<C extends React.Component>(
    component: C
  ): C;

  // Components
  export class FlatFeed extends Component {}
  export class NotificationFeed extends Component {}
  export class SinglePost extends Component {}
  export class Avatar extends Component {}
  export class FollowButton extends Component {}
  export class UrlPreview extends Component {}
  export class StatusUpdateForm extends Component {}
  export class UploadImage extends Component {}
  export class UserBar extends Component {}
  export class UserCard extends Component {}
  export class ReactionIcon extends Component {}
  export class ReactionToggleIcon extends Component {}
  export class ReactionIconBar extends Component {}
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
  export function humanizeTimestamp(...args: unknown[]): unknown;
  export function registerNativeHandlers(...args: unknown[]): unknown;
  export function setAndroidTranslucentStatusBar(...args: unknown[]): unknown;
}
