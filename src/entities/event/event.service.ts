import { mockFetch } from '~/src/shared/libs/mock-fetch';
import type {
  GetEventsQueryParams,
  GetEventsResponse,
} from './contracts/get-events.contract';
import { paginateEvents } from './helpers/paginate-events';
import { searchEvents } from './helpers/search-events';
import { sortEvents } from './helpers/sort-events';
import type { Event } from './types/event.type';

class EventService {
  async getEvents(params: GetEventsQueryParams): Promise<GetEventsResponse> {
    const { page, limit, sortBy, order, search } = params;

    const result = await mockFetch('~/db/events.json');
    const eventsData = JSON.parse(result) as Array<Event>;

    const filteredEvents = searchEvents(eventsData, search);
    const sortedEvents = sortEvents(filteredEvents, sortBy, order);
    const paginatedEvents = paginateEvents(sortedEvents, page, limit);

    return {
      events: paginatedEvents,
      eventsCount: filteredEvents.length,
    };
  }
}

export const eventService = new EventService();
