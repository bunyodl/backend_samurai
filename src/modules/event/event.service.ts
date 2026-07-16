import { eventRepository } from '@/modules/event/event.repository';
import type { GetEventResponse } from '@/modules/event/schemas/endpoints/get-event.schema';
import type {
  GetEventsQuery,
  GetEventsResponse,
} from '@/modules/event/schemas/endpoints/get-events.schema';

class EventService {
  async getMany(params: GetEventsQuery): Promise<GetEventsResponse> {
    const [events, eventsCount] = await Promise.all([
      eventRepository.getMany(params),
      eventRepository.getTotalCount(params.search),
    ]);

    return { events, eventsCount };
  }

  async getById(eventId: string): Promise<GetEventResponse> {
    const event = await eventRepository.getById(eventId);
    return { event };
  }
}

export const eventService = new EventService();
