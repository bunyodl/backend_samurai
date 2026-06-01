import type { EventApiModel } from '../types/event.type.js';

export interface GetEventParams {
  eventId: string;
}

export interface GetEventResponse {
  event: EventApiModel | null;
}
