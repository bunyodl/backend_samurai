import type { Event } from '../types/event.type';

export interface GetEventParams {
  eventId: string;
}

export interface GetEventResponse {
  event: Event | null;
}
