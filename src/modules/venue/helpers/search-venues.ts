import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';

const fieldSelectors = [
  (v: VenueDto) => v.location,
  (v: VenueDto) => v.name,
  (v: VenueDto) => v.timezone,
];

export function searchVenues(
  venues: Array<VenueDto>,
  search?: string,
): Array<VenueDto> {
  if (!search) return venues;

  return venues.filter((venue) => {
    return fieldSelectors.some((getField) => {
      const field = getField(venue);
      return field.toLowerCase().includes(search.toLowerCase());
    });
  });
}
