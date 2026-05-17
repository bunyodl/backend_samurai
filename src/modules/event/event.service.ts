import type { GetEventResponse } from './contracts/get-event.contract.js';
import type {
  GetEventsQueryParams,
  GetEventsResponse,
} from './contracts/get-events.contract.js';
import { eventsRepository } from './event.repository.js';

class EventService {
  async getEvents(params: GetEventsQueryParams): Promise<GetEventsResponse> {
    const [events, eventsCount] = await Promise.all([
      eventsRepository.getEvents(params),
      eventsRepository.getEventsCount(params.search),
    ]);

    return { events, eventsCount };
  }

  async getEvent(eventId: number): Promise<GetEventResponse> {
    const event = await eventsRepository.findEventById(eventId);
    return { event };
  }
}

export const eventService = new EventService();
