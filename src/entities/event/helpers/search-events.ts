import type { EventApiModel } from '../types/event.type.js';

const fieldSelectors = [
  (e: EventApiModel) => e.title,
  (e: EventApiModel) => e.description,
  (e: EventApiModel) => e.tags.join(', '),
];

export function searchEvents(
  events: Array<EventApiModel>,
  search?: string,
): Array<EventApiModel> {
  if (!search) return events;

  return events.filter((event) => {
    return fieldSelectors.some((getField) => {
      const field = getField(event);
      return field.toLowerCase().includes(search.toLowerCase());
    });
  });
}
