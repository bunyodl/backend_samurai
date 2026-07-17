import { toIsoString } from '@/common/libs/to-iso-string';

import type { EventDto } from '@/modules/event/schemas/resources/event.schema';
import type { EventRow } from '@/modules/event/types/event-row.type';

export function mapEventRowToDto(row: EventRow): EventDto {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type,
    status: row.status,
    venueId: row.venue_id,
    organizerId: row.organizer_id,
    date: toIsoString(row.date),
    tags: row.tags,
    createdAt: toIsoString(row.created_at),
    updatedAt: row.updated_at ? toIsoString(row.updated_at) : null,
  };
}
