import type {
  EventStatus,
  EventType,
} from '@/modules/event/constants/event.constants';

import type { RowTimestamps } from '@/db/types/row-timestamps.type';

export interface EventRow extends RowTimestamps {
  id: string;
  title: string;
  description: string | null;
  type: EventType;
  status: EventStatus;
  venue_id: string;
  organizer_id: string;
  date: Date;
  tags: string[] | null;
}
