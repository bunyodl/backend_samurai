import { mockFetch } from '../../shared/libs/mock-fetch.js';
import type { GetEventResponse } from './contracts/get-event.contract.js';
import type {
  GetEventsQueryParams,
  GetEventsResponse,
} from './contracts/get-events.contract.js';
import { paginateEvents } from './helpers/paginate-events.js';
import { searchEvents } from './helpers/search-events.js';
import { sortEvents } from './helpers/sort-events.js';
import type { Event } from './types/event.type.js';

class EventService {
  async getEvents(params: GetEventsQueryParams): Promise<GetEventsResponse> {
    const { page, limit, sortBy, sort, search } = params;

    const result = await mockFetch('./db/events.json');
    const eventsData = JSON.parse(result) as Array<Event>;

    const filteredEvents = searchEvents(eventsData, search);
    const sortedEvents = sortEvents(filteredEvents, sortBy, sort);
    const paginatedEvents = paginateEvents(sortedEvents, page, limit);

    return {
      events: paginatedEvents,
      eventsCount: filteredEvents.length,
    };
  }

  async getEvent(eventId: number): Promise<GetEventResponse> {
    const result = await mockFetch('./db/events.json');
    const eventsData = JSON.parse(result) as Array<Event>;

    const desiredEvent = eventsData.find((event) => event.id === eventId);

    return { event: desiredEvent ?? null };
  }
}

export const eventService = new EventService();
