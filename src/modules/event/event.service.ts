import { eventsRepository } from '@/modules/event/event.repository';
import type { GetEventResponse } from '@/modules/event/schemas/endpoints/get-event.schema';
import type {
  GetEventsQuery,
  GetEventsResponse,
} from '@/modules/event/schemas/endpoints/get-events.schema';

class EventService {
  async getEvents(params: GetEventsQuery): Promise<GetEventsResponse> {
    const [events, eventsCount] = await Promise.all([
      eventsRepository.getEvents(params),
      eventsRepository.getEventsCount(params.search),
    ]);

    return { events, eventsCount };
  }

  async getEvent(eventId: string): Promise<GetEventResponse> {
    const event = await eventsRepository.findEventById(eventId);
    return { event };
  }
}

export const eventService = new EventService();
