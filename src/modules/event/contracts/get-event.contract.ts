import type { EventApiModel } from '@/modules/event/types/event.type';

export interface GetEventParams {
  eventId: string;
}

export interface GetEventResponse {
  event: EventApiModel | null;
}
