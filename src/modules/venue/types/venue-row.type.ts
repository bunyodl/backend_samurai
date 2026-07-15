import type { RowTimestamps } from '@/db/types/row-timestamps.type';

export interface VenueRow extends RowTimestamps {
  id: string;
  name: string;
  location: string;
  timezone: string;
  capacity: number;
}
