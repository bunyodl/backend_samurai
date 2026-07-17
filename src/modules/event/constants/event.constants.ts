import type {
  NonEmptyArray,
  ValueOf,
} from '~/src/common/types/utility-types.type';

export const EVENT_TYPES = {
  IN_PERSON: 'in-person',
  ONLINE: 'online',
} as const;

export type EventType = ValueOf<typeof EVENT_TYPES>;
export const EVENT_TYPE_VALUES = Object.values(
  EVENT_TYPES,
) as NonEmptyArray<EventType>;

export const EVENT_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
} as const;

export type EventStatus = ValueOf<typeof EVENT_STATUSES>;
export const EVENT_STATUS_VALUES = Object.values(
  EVENT_STATUSES,
) as NonEmptyArray<EventStatus>;
