import type { EventApiModel } from '../types/event.type';

export interface GetEventParams {
  eventId: string;
}

export interface GetEventResponse {
  event: EventApiModel | null;
}
