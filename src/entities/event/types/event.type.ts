export interface EventApiModel {
  id: number;
  title: string;
  description: string;
  venueId: number;
  organizerId: number;
  date: string;
  tags: string[];
  price: number;
}
