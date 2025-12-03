import type { Event } from '../types/event.type.js';

const fieldSelectors = [
  (e: Event) => e.title,
  (e: Event) => e.description,
  (e: Event) => e.tags.join(', '),
];

export function searchEvents(
  events: Array<Event>,
  search?: string,
): Array<Event> {
  if (!search) return events;

  return events.filter((event) => {
    return fieldSelectors.some((getField) => {
      const field = getField(event);
      return field.toLowerCase().includes(search.toLowerCase());
    });
  });
}
