export type EventType = 'in-person' | 'online';
export type EventStatus = 'draft' | 'published' | 'cancelled';

export interface EventRow {
  id: string;
  title: string;
  description: string | null;
  type: EventType;
  status: EventStatus;
  venue_id: string;
  organizer_id: string;
  date: Date;
  tags: string[] | null;
  created_at: Date;
  updated_at: Date | null;
}
