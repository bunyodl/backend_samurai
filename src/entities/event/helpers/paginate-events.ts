import type { EventApiModel } from '../types/event.type.js';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export function paginateEvents(
  events: Array<EventApiModel>,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
): Array<EventApiModel> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return events.slice(startIndex, endIndex);
}
