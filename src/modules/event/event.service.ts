import type { GetEventResponse } from '@/modules/event/contracts/get-event.contract';
import type {
  GetEventsQueryParams,
  GetEventsResponse,
} from '@/modules/event/contracts/get-events.contract';
import { eventsRepository } from '@/modules/event/event.repository';

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
