import type { Venue } from '../types/venue.type';

const fieldSelectors = [
  (v: Venue) => v.location.city,
  (v: Venue) => v.location.country,
  (v: Venue) => v.name,
];

export function searchVenues(
  venues: Array<Venue>,
  search?: string,
): Array<Venue> {
  if (!search) return venues;

  return venues.filter((venue) => {
    return fieldSelectors.some((getField) => {
      const field = getField(venue);
      return field.toLowerCase().includes(search.toLowerCase());
    });
  });
}
