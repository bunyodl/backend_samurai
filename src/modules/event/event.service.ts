import { eventRepository } from '@/modules/event/event.repository';
import type { CreateEventRequestBody } from '@/modules/event/schemas/endpoints/create-event.schema';
import type { GetEventResponse } from '@/modules/event/schemas/endpoints/get-event.schema';
import type {
  GetEventsQuery,
  GetEventsResponse,
} from '@/modules/event/schemas/endpoints/get-events.schema';
import type { PatchEventRequestBody } from '@/modules/event/schemas/endpoints/patch-event.schema';
import type { EventDto } from '@/modules/event/schemas/resources/event.schema';

import { NotFoundException } from '@/common/exceptions';
import { mapEventRowToDto } from './helpers/map-event-row';

class EventService {
  async getMany(params: GetEventsQuery): Promise<GetEventsResponse> {
    const [eventRows, eventsCount] = await Promise.all([
      eventRepository.getMany(params),
      eventRepository.getTotalCount(params.search),
    ]);

    const events = eventRows.map(mapEventRowToDto);
    return { events, eventsCount };
  }

  async getById(eventId: string): Promise<GetEventResponse> {
    const eventRow = await eventRepository.getById(eventId);

    if (!eventRow) {
      throw new NotFoundException('Event not found');
    }

    return { event: mapEventRowToDto(eventRow) };
  }

  async create(body: CreateEventRequestBody): Promise<EventDto> {
    const createdEvent = await eventRepository.create(body);
    return mapEventRowToDto(createdEvent);
  }

  async patch(
    eventId: string,
    body: PatchEventRequestBody,
  ): Promise<EventDto> {
    const eventRow = await eventRepository.patch(eventId, body);

    if (!eventRow) {
      throw new NotFoundException('Event not found');
    }

    return mapEventRowToDto(eventRow);
  }

  async delete(eventId: string): Promise<EventDto> {
    const eventRow = await eventRepository.delete(eventId);

    if (!eventRow) {
      throw new NotFoundException('Event not found');
    }

    return mapEventRowToDto(eventRow);
  }
}

export const eventService = new EventService();
