import { toIsoString } from '@/common/libs/to-iso-string';

import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';
import type { VenueRow } from '@/modules/venue/types/venue-row.type';

export function mapVenueRowToDto(row: VenueRow): VenueDto {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    timezone: row.timezone,
    capacity: row.capacity,
    createdAt: toIsoString(row.created_at),
    updatedAt: row.updated_at ? toIsoString(row.updated_at) : null,
  };
}
